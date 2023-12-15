const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

import { DEMO_CITIES } from '../data/demoData';

function toAppFormat(apiData) {
  const { main, wind, weather, name, sys } = apiData;
  return {
    name,
    country: sys.country,
    current: {
      temp: Math.round(main.temp),
      feels_like: Math.round(main.feels_like),
      humidity: main.humidity,
      wind: Math.round(wind.speed * 3.6),
      pressure: main.pressure,
      condition: weather[0].main,
      description: weather[0].description,
      icon: weatherIcon(weather[0].main),
    },
  };
}

function weatherIcon(condition) {
  const map = {
    Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
    Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Haze: '🌫️', Fog: '🌫️',
  };
  return map[condition] || '🌤️';
}

export async function fetchWeather(city) {
  const demoKey = Object.keys(DEMO_CITIES).find(
    (k) => k.toLowerCase() === city.toLowerCase()
  );
  if (demoKey) {
    return DEMO_CITIES[demoKey];
  }

  if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    throw new Error(`Demo mode: "${city}" not available. Try: London, Tokyo, New York, Sydney, or Mumbai.`);
  }

  try {
    const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    const formatted = toAppFormat(data);

    const forecastRes = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
    const forecastData = await forecastRes.json();

    formatted.hourly = forecastData.list.slice(0, 12).map((item) => ({
      time: item.dt_txt,
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
      wind: Math.round(item.wind.speed * 3.6),
      condition: item.weather[0].main,
      icon: weatherIcon(item.weather[0].main),
    }));

    const dailyMap = {};
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap[date]) dailyMap[date] = { temps: [], conditions: [], humidity: [], wind: [] };
      dailyMap[date].temps.push(item.main.temp);
      dailyMap[date].conditions.push(item.weather[0].main);
      dailyMap[date].humidity.push(item.main.humidity);
      dailyMap[date].wind.push(item.wind.speed);
    });

    formatted.forecast = Object.entries(dailyMap).slice(0, 5).map(([date, d]) => ({
      date,
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      temp_max: Math.round(Math.max(...d.temps)),
      temp_min: Math.round(Math.min(...d.temps)),
      condition: d.conditions.sort((a, b) =>
        d.conditions.filter((v) => v === b).length - d.conditions.filter((v) => v === a).length
      )[0],
      icon: weatherIcon(d.conditions[0]),
      humidity: Math.round(d.humidity.reduce((a, b) => a + b, 0) / d.humidity.length),
      wind: Math.round((d.wind.reduce((a, b) => a + b, 0) / d.wind.length) * 3.6),
    }));

    return formatted;
  } catch (err) {
    throw new Error(err.message || 'Failed to fetch weather data');
  }
}

export async function fetchWeatherByCoords(lat, lon) {
  if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    return DEMO_CITIES['London'];
  }

  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  if (!res.ok) throw new Error('Location not found');
  const data = await res.json();
  return fetchWeather(data.name);
}

export function toFahrenheit(c) {
  return Math.round(c * 9 / 5 + 32);
}

export function getWeatherGradient(condition) {
  const gradients = {
    Clear: 'linear-gradient(135deg, #0c4a6e, #0369a1, #0ea5e9)',
    Clouds: 'linear-gradient(135deg, #1e293b, #334155, #475569)',
    Rain: 'linear-gradient(135deg, #0f172a, #1e3a5f, #374151)',
    Drizzle: 'linear-gradient(135deg, #1e293b, #2d4a5e, #475569)',
    Thunderstorm: 'linear-gradient(135deg, #0f0f1a, #1a1a2e, #2d2d44)',
    Snow: 'linear-gradient(135deg, #1e293b, #cbd5e1, #e2e8f0)',
    Mist: 'linear-gradient(135deg, #1e293b, #374151, #4b5563)',
    default: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)',
  };
  return gradients[condition] || gradients.default;
}
