// routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route to get weather data
router.get('/weather-data', weatherController.getWeatherData);

// Route to get daily summaries
router.get('/daily-summaries', weatherController.getDailySummaries);

// Route to get alerts
router.get('/alerts', weatherController.getAlerts);

router.get('/forecast-summaries', weatherController.getForecastSummaries);

module.exports = router;
