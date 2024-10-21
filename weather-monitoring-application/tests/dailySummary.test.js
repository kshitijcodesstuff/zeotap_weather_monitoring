const { calculateDailySummaries } = require('../controllers/weatherController');
const { weatherData, dailySummaries } = require('../data/dataStore');

describe('Daily Weather Summary', () => {
  beforeEach(() => {
    weatherData.length = 0;
    dailySummaries.length = 0;

    // Simulate weather data
    weatherData.push(
      { city: 'Delhi', temp: 30, dt: 1634567890, main: 'Clear', humidity: 60, wind_speed: 10 },
      { city: 'Delhi', temp: 32, dt: 1634571490, main: 'Clear', humidity: 65, wind_speed: 12 },
      { city: 'Delhi', temp: 28, dt: 1634654290, main: 'Rain', humidity: 70, wind_speed: 8 },
      { city: 'Delhi', temp: 29, dt: 1634657890, main: 'Rain', humidity: 75, wind_speed: 9 }
    );
    calculateDailySummaries();
  });

  it('should calculate daily summaries correctly', () => {
    expect(dailySummaries.length).toBe(2);

    const day1Summary = dailySummaries.find(summary => summary.date === '2021-10-18');
    expect(day1Summary).toBeDefined();
    expect(day1Summary.averageTemp).toBe('31.00');
    expect(day1Summary.dominantCondition).toBe('Clear');

    const day2Summary = dailySummaries.find(summary => summary.date === '2021-10-19');
    expect(day2Summary).toBeDefined();
    expect(day2Summary.averageTemp).toBe('28.50');
    expect(day2Summary.dominantCondition).toBe('Rain');
  });
});
