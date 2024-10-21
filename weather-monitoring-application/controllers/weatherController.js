
// Import necessary modules
const axios = require('axios');
const cron = require('node-cron');
const { weatherData, dailySummaries, alerts } = require('../data/dataStore');
const { convertKelvinToCelsius, getCurrentDate } = require('../utils/helpers');

// OpenWeatherMap API key
const API_KEY = process.env.OPENWEATHER_API_KEY;

// List of Indian metros with their city IDs
const cities = [
  { name: 'Delhi', id: '1273294' },
  { name: 'Mumbai', id: '1275339' },
  { name: 'Chennai', id: '1264527' },
  { name: 'Bangalore', id: '1277333' },
  { name: 'Kolkata', id: '1275004' },
  { name: 'Hyderabad', id: '1269843' },
];

// User-configurable thresholds
const userThresholds = {
  temperature: 35,   // degrees Celsius
  windSpeed: 50,     // km/h
  consecutiveUpdates: 2,
};

// Alert counters
const tempAlerts = {};
const windAlerts = {};

// Data store for forecast data
const forecastData = [];

// Data store for forecast summaries
const forecastSummaries = [];

// Function to fetch current weather data
async function fetchWeatherData() {
  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            id: city.id,
            appid: API_KEY,
          },
        }
      );

      const data = response.data;

      // Convert temperatures
      const temp = convertKelvinToCelsius(data.main.temp);
      const feels_like = convertKelvinToCelsius(data.main.feels_like);
      const dt = data.dt;
      const main = data.weather[0].main;

      // Additional parameters
      const humidity = data.main.humidity; // in percentage
      const wind_speed = data.wind.speed * 3.6; // Convert m/s to km/h

      // Store the processed data
      weatherData.push({
        city: city.name,
        temp,
        feels_like,
        dt,
        main,
        humidity,
        wind_speed,
      });

      // Log the data for debugging
      console.log(`Fetched data for ${city.name}:`, weatherData[weatherData.length - 1]);

      // Check for alerts
      checkAlerts(city.name, temp, main, humidity, wind_speed);
    }

    // Call calculateDailySummaries after fetching data
    calculateDailySummaries();
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

// Function to fetch weather forecast data
async function fetchWeatherForecast() {
  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            id: city.id,
            appid: API_KEY,
          },
        }
      );

      const data = response.data;

      // Process forecast data
      processForecastData(city.name, data.list);
    }

    // Calculate forecast summaries
    calculateForecastSummaries();
  } catch (error) {
    console.error('Error fetching weather forecast:', error.message);
  }
}

// Function to process and store forecast data
function processForecastData(cityName, forecasts) {
  forecasts.forEach((forecast) => {
    // Convert temperature from Kelvin to Celsius
    const temp = convertKelvinToCelsius(forecast.main.temp);
    const feels_like = convertKelvinToCelsius(forecast.main.feels_like);
    const dt = forecast.dt;
    const main = forecast.weather[0].main;
    const humidity = forecast.main.humidity;
    const wind_speed = forecast.wind.speed * 3.6; // Convert m/s to km/h

    // Store the forecast data
    forecastData.push({
      city: cityName,
      temp,
      feels_like,
      dt,
      main,
      humidity,
      wind_speed,
    });
  });
}

// Function to calculate daily summaries for current weather data
function calculateDailySummaries() {
  const summaries = {};

  weatherData.forEach((entry) => {
    const date = getCurrentDate(entry.dt);
    const key = `${entry.city}-${date}`;

    if (!summaries[key]) {
      summaries[key] = {
        city: entry.city,
        date,
        temps: [],
        humidities: [],
        windSpeeds: [],
        conditions: {},
      };
    }

    summaries[key].temps.push(entry.temp);
    summaries[key].humidities.push(entry.humidity);
    summaries[key].windSpeeds.push(entry.wind_speed);

    const condition = entry.main;
    summaries[key].conditions[condition] =
      (summaries[key].conditions[condition] || 0) + 1;
  });

  // Clear previous summaries
  dailySummaries.length = 0;

  // Populate new summaries
  Object.values(summaries).forEach((summary) => {
    const temps = summary.temps;
    const avgTemp =
      temps.reduce((acc, curr) => acc + curr, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    const humidities = summary.humidities;
    const avgHumidity =
      humidities.reduce((acc, curr) => acc + curr, 0) / humidities.length;
    const maxHumidity = Math.max(...humidities);
    const minHumidity = Math.min(...humidities);

    const windSpeeds = summary.windSpeeds;
    const avgWindSpeed =
      windSpeeds.reduce((acc, curr) => acc + curr, 0) / windSpeeds.length;
    const maxWindSpeed = Math.max(...windSpeeds);
    const minWindSpeed = Math.min(...windSpeeds);

    // Determine dominant weather condition
    const dominantCondition = Object.entries(summary.conditions).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    )[0];

    dailySummaries.push({
      city: summary.city,
      date: summary.date,
      averageTemp: avgTemp.toFixed(2),
      maxTemp: maxTemp.toFixed(2),
      minTemp: minTemp.toFixed(2),
      averageHumidity: avgHumidity.toFixed(2),
      maxHumidity: maxHumidity.toFixed(2),
      minHumidity: minHumidity.toFixed(2),
      averageWindSpeed: avgWindSpeed.toFixed(2),
      maxWindSpeed: maxWindSpeed.toFixed(2),
      minWindSpeed: minWindSpeed.toFixed(2),
      dominantCondition,
    });
  });

  console.log('Daily summaries calculated:', dailySummaries);
}

// Function to calculate summaries for forecast data
function calculateForecastSummaries() {
  const summaries = {};

  forecastData.forEach((entry) => {
    const date = getCurrentDate(entry.dt);
    const key = `${entry.city}-${date}`;

    if (!summaries[key]) {
      summaries[key] = {
        city: entry.city,
        date,
        temps: [],
        humidities: [],
        windSpeeds: [],
        conditions: {},
      };
    }

    summaries[key].temps.push(entry.temp);
    summaries[key].humidities.push(entry.humidity);
    summaries[key].windSpeeds.push(entry.wind_speed);

    const condition = entry.main;
    summaries[key].conditions[condition] =
      (summaries[key].conditions[condition] || 0) + 1;
  });

  // Clear previous summaries
  forecastSummaries.length = 0;

  // Populate new summaries
  Object.values(summaries).forEach((summary) => {
    const temps = summary.temps;
    const avgTemp =
      temps.reduce((acc, curr) => acc + curr, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    const humidities = summary.humidities;
    const avgHumidity =
      humidities.reduce((acc, curr) => acc + curr, 0) / humidities.length;
    const maxHumidity = Math.max(...humidities);
    const minHumidity = Math.min(...humidities);

    const windSpeeds = summary.windSpeeds;
    const avgWindSpeed =
      windSpeeds.reduce((acc, curr) => acc + curr, 0) / windSpeeds.length;
    const maxWindSpeed = Math.max(...windSpeeds);
    const minWindSpeed = Math.min(...windSpeeds);

    // Determine dominant weather condition
    const dominantCondition = Object.entries(summary.conditions).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    )[0];

    forecastSummaries.push({
      city: summary.city,
      date: summary.date,
      averageTemp: avgTemp.toFixed(2),
      maxTemp: maxTemp.toFixed(2),
      minTemp: minTemp.toFixed(2),
      averageHumidity: avgHumidity.toFixed(2),
      maxHumidity: maxHumidity.toFixed(2),
      minHumidity: minHumidity.toFixed(2),
      averageWindSpeed: avgWindSpeed.toFixed(2),
      maxWindSpeed: maxWindSpeed.toFixed(2),
      minWindSpeed: minWindSpeed.toFixed(2),
      dominantCondition,
    });
  });

  console.log('Forecast summaries calculated:', forecastSummaries);
}

// Function to check and trigger alerts
function checkAlerts(city, temp, mainCondition, humidity, windSpeed) {
  // Temperature alert logic
  if (temp > userThresholds.temperature) {
    tempAlerts[city] = (tempAlerts[city] || 0) + 1;
  } else {
    tempAlerts[city] = 0;
  }

  if (tempAlerts[city] >= userThresholds.consecutiveUpdates) {
    // Trigger temperature alert
    alerts.push({
      city,
      temp: temp.toFixed(2),
      condition: mainCondition,
      time: new Date().toISOString(),
      alertType: 'Temperature',
    });
    console.log(`Alert for ${city}: Temperature exceeded threshold.`);
    // Reset counter
    tempAlerts[city] = 0;
  }

  // Wind speed alert logic
  if (windSpeed > userThresholds.windSpeed) {
    windAlerts[city] = (windAlerts[city] || 0) + 1;
  } else {
    windAlerts[city] = 0;
  }

  if (windAlerts[city] >= userThresholds.consecutiveUpdates) {
    // Trigger wind speed alert
    alerts.push({
      city,
      windSpeed: windSpeed.toFixed(2),
      condition: mainCondition,
      time: new Date().toISOString(),
      alertType: 'Wind Speed',
    });
    console.log(`Alert for ${city}: Wind speed exceeded threshold.`);
    // Reset counter
    windAlerts[city] = 0;
  }
}

// Schedule the fetchWeatherData function every 5 minutes
cron.schedule('*/5 * * * *', fetchWeatherData);

// Initial call to populate current weather data immediately
fetchWeatherData();

// Schedule the fetchWeatherForecast function every hour
cron.schedule('0 * * * *', fetchWeatherForecast);

// Initial call to populate forecast data immediately
fetchWeatherForecast();

// Route handlers
exports.getWeatherData = (req, res) => {
  res.json(weatherData);
};

exports.getDailySummaries = (req, res) => {
  res.json(dailySummaries);
};

exports.getForecastSummaries = (req, res) => {
  res.json(forecastSummaries);
};

exports.getAlerts = (req, res) => {
  res.json(alerts);
};

exports.fetchWeatherData = fetchWeatherData;
exports.fetchWeatherForecast = fetchWeatherForecast;
exports.calculateDailySummaries = calculateDailySummaries;
exports.calculateForecastSummaries = calculateForecastSummaries;
exports.checkAlerts = checkAlerts;

