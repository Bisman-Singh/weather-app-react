import { toFahrenheit } from '../utils/weather';

export default function CurrentWeather({ weather, unit }) {
  const { current, name, country } = weather;
  const temp = unit === 'C' ? current.temp : toFahrenheit(current.temp);
  const feelsLike = unit === 'C' ? current.feels_like : toFahrenheit(current.feels_like);

  return (
    <div className="current-weather">
      <div className="current-main">
        <div className="current-icon">{current.icon}</div>
        <div className="current-temp">
          <span className="temp-value">{temp}°</span>
          <span className="temp-unit">{unit}</span>
        </div>
      </div>
      <div className="current-info">
        <h2 className="city-name">{name}, {country}</h2>
        <p className="weather-desc">{current.description}</p>
      </div>
      <div className="current-details">
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{feelsLike}°{unit}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind</span>
          <span className="detail-value">{current.wind} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🔽</span>
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{current.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
