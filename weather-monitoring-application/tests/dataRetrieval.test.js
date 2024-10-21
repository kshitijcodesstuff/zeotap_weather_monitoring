const app = require('../index');
const request = require('supertest');
const axios = require('axios');
const weatherController = require('../controllers/weatherController');
const { weatherData } = require('../data/dataStore');

jest.mock('axios');

let server; // Add this variable to store the server instance

describe('Data Retrieval', () => {
  const mockWeatherResponse = {
    data: {
      main: { temp: 300, feels_like: 303, humidity: 70 },
      dt: 1634567890,
      weather: [{ main: 'Clear' }],
      wind: { speed: 5 },
    },
  };

  beforeAll(() => {
    axios.get.mockResolvedValue(mockWeatherResponse);
    weatherData.length = 0; // Clear existing data
    server = app.listen(5003); // Use a different port for testing
  });

  afterAll(() => {
    server.close(); // Close the server after tests
  });

  it('should retrieve and parse weather data correctly', async () => {
    await weatherController.fetchWeatherData();
    expect(weatherData.length).toBeGreaterThan(0);

    const entry = weatherData[0];
    expect(entry).toHaveProperty('city');
    expect(entry.temp).toBeCloseTo(26.85, 2);
    expect(entry.feels_like).toBeCloseTo(29.85, 2);
    expect(entry).toHaveProperty('humidity', 70);
    expect(entry).toHaveProperty('wind_speed', 18);
    expect(entry).toHaveProperty('main', 'Clear');
  });
});
