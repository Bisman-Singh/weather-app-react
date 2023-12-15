import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { fetchWeather, fetchWeatherByCoords, getWeatherGradient } from './utils/weather';

function loadRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem('weather_recent')) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');
  const [recentSearches, setRecentSearches] = useState(loadRecentSearches);

  const addRecent = useCallback((city) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      const updated = [city, ...filtered].slice(0, 8);
      localStorage.setItem('weather_recent', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSearch = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      addRecent(data.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [addRecent]);

  const handleGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          setWeather(data);
          addRecent(data.name);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied. Try searching by city name.');
        setLoading(false);
      }
    );
  }, [addRecent]);

  useEffect(() => {
    handleSearch('London');
  }, [handleSearch]);

  const bgGradient = weather ? getWeatherGradient(weather.current.condition) : getWeatherGradient('default');

  return (
    <div className="app" style={{ background: bgGradient }}>
      <div className="app-container">
        <header className="app-header">
          <h1>Weather</h1>
          <button
            className="unit-toggle"
            onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
          >
            °{unit === 'C' ? 'F' : 'C'}
          </button>
        </header>

        <SearchBar
          onSearch={handleSearch}
          onGeolocate={handleGeolocation}
          recentSearches={recentSearches}
        />

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner" />
            <span>Loading weather data...</span>
          </div>
        )}

        {weather && !loading && (
          <>
            <CurrentWeather weather={weather} unit={unit} />
            <HourlyForecast hours={weather.hourly} unit={unit} />
            <DailyForecast days={weather.forecast} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}
