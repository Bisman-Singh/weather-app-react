import { toFahrenheit } from '../utils/weather';

export default function DailyForecast({ days, unit }) {
  if (!days || days.length === 0) return null;

  return (
    <div className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="daily-grid">
        {days.map((d) => {
          const max = unit === 'C' ? d.temp_max : toFahrenheit(d.temp_max);
          const min = unit === 'C' ? d.temp_min : toFahrenheit(d.temp_min);
          return (
            <div key={d.date} className="daily-card">
              <span className="daily-day">{d.day}</span>
              <span className="daily-icon">{d.icon}</span>
              <span className="daily-condition">{d.condition}</span>
              <div className="daily-temps">
                <span className="daily-max">{max}°</span>
                <span className="daily-min">{min}°</span>
              </div>
              <div className="daily-details">
                <span>💧 {d.humidity}%</span>
                <span>💨 {d.wind} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
