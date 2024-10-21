// // tests/systemSetup.test.js

// const app = require('../index');
// const request = require('supertest');

// describe('System Setup', () => {
//   it('should have a valid OpenWeatherMap API key', () => {
//     expect(process.env.OPENWEATHER_API_KEY).toBeDefined();
//     expect(process.env.OPENWEATHER_API_KEY).not.toBe('');
//   });

//   it('should start the server without errors', async () => {
//     const res = await request(app).get('/api/weather-data');
//     expect(res.statusCode).toBe(200);
//   });
// });
// tests/systemSetup.test.js

const app = require('../index');
const request = require('supertest');

describe('System Setup', () => {
  it('should start the server without errors', async () => {
    const res = await request(app).get('/api/weather-data');
    expect(res.statusCode).toBe(200);
    // Optional: Check if the response has a valid structure
    expect(res.body).toBeInstanceOf(Array);
  });
});
