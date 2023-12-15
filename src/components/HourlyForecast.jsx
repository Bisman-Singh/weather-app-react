import { toFahrenheit } from '../utils/weather';

export default function HourlyForecast({ hours, unit }) {
  if (!hours || hours.length === 0) return null;

  return (
    <div className="forecast-section">
      <h3>Hourly Forecast</h3>
      <div className="hourly-scroll">
        {hours.map((h, i) => {
          const time = new Date(h.time);
          const label = i === 0 ? 'Now' : time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          const temp = unit === 'C' ? h.temp : toFahrenheit(h.temp);
          return (
            <div key={i} className="hourly-card">
              <span className="hourly-time">{label}</span>
              <span className="hourly-icon">{h.icon}</span>
              <span className="hourly-temp">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
