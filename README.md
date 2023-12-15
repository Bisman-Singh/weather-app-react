# Weather App

A weather application with forecasts, built with React.

## Features

- Search weather by city name
- Geolocation button for current location weather
- Current weather display (temperature, feels like, humidity, wind, pressure, description, icon)
- 5-day forecast cards
- Hourly forecast (next 12 hours)
- Celsius/Fahrenheit toggle
- Recent searches saved to localStorage
- Animated weather backgrounds (CSS gradients change based on weather condition)
- Demo fallback mode with hardcoded data for 5 cities

## Demo Cities

London, Tokyo, New York, Sydney, Mumbai

## API

Uses OpenWeatherMap API. Replace the placeholder API key in `src/utils/weather.js` with your own key, or use demo mode with the 5 built-in cities.

## Tech Stack

- React (Vite)
- No extra dependencies

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
