// client/src/services/api.js
import axios from 'axios';

export const fetchDailySummaries = () => axios.get('/api/daily-summaries');
export const fetchAlerts = () => axios.get('/api/alerts');
export const fetchWeatherData = () => axios.get('/api/weather-data');
export const fetchForecastSummaries = () => axios.get('/api/forecast-summaries');

