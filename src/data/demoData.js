function generateHourly(baseTemp, condition) {
  const hours = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const time = new Date(now.getTime() + i * 3600000);
    hours.push({
      time: time.toISOString(),
      temp: baseTemp + Math.round((Math.random() - 0.5) * 6),
      feels_like: baseTemp + Math.round((Math.random() - 0.5) * 8),
      humidity: 50 + Math.round(Math.random() * 30),
      wind: 5 + Math.round(Math.random() * 15),
      condition,
      icon: getIcon(condition),
    });
  }
  return hours;
}

function generateForecast(baseTemp, conditions) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const date = new Date(now.getTime() + (i + 1) * 86400000);
    const cond = conditions[i % conditions.length];
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      temp_max: baseTemp + 3 + Math.round(Math.random() * 4),
      temp_min: baseTemp - 3 - Math.round(Math.random() * 4),
      condition: cond,
      icon: getIcon(cond),
      humidity: 40 + Math.round(Math.random() * 40),
      wind: 5 + Math.round(Math.random() * 20),
    });
  }
  return days;
}

function getIcon(condition) {
  const map = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Partly Cloudy': '⛅',
  };
  return map[condition] || '🌤️';
}

export const DEMO_CITIES = {
  London: {
    name: 'London',
    country: 'GB',
    current: {
      temp: 12,
      feels_like: 9,
      humidity: 78,
      wind: 14,
      pressure: 1013,
      condition: 'Clouds',
      description: 'Overcast clouds',
      icon: '☁️',
    },
    hourly: generateHourly(12, 'Clouds'),
    forecast: generateForecast(12, ['Clouds', 'Rain', 'Drizzle', 'Clouds', 'Partly Cloudy']),
  },
  Tokyo: {
    name: 'Tokyo',
    country: 'JP',
    current: {
      temp: 22,
      feels_like: 24,
      humidity: 65,
      wind: 8,
      pressure: 1018,
      condition: 'Clear',
      description: 'Clear sky',
      icon: '☀️',
    },
    hourly: generateHourly(22, 'Clear'),
    forecast: generateForecast(22, ['Clear', 'Partly Cloudy', 'Clear', 'Clouds', 'Clear']),
  },
  'New York': {
    name: 'New York',
    country: 'US',
    current: {
      temp: 18,
      feels_like: 16,
      humidity: 55,
      wind: 20,
      pressure: 1010,
      condition: 'Partly Cloudy',
      description: 'Partly cloudy',
      icon: '⛅',
    },
    hourly: generateHourly(18, 'Partly Cloudy'),
    forecast: generateForecast(18, ['Rain', 'Clouds', 'Clear', 'Partly Cloudy', 'Thunderstorm']),
  },
  Sydney: {
    name: 'Sydney',
    country: 'AU',
    current: {
      temp: 26,
      feels_like: 28,
      humidity: 70,
      wind: 12,
      pressure: 1015,
      condition: 'Clear',
      description: 'Sunny',
      icon: '☀️',
    },
    hourly: generateHourly(26, 'Clear'),
    forecast: generateForecast(26, ['Clear', 'Clear', 'Partly Cloudy', 'Rain', 'Clear']),
  },
  Mumbai: {
    name: 'Mumbai',
    country: 'IN',
    current: {
      temp: 32,
      feels_like: 36,
      humidity: 80,
      wind: 10,
      pressure: 1008,
      condition: 'Mist',
      description: 'Haze',
      icon: '🌫️',
    },
    hourly: generateHourly(32, 'Mist'),
    forecast: generateForecast(32, ['Thunderstorm', 'Rain', 'Rain', 'Clouds', 'Thunderstorm']),
  },
};
