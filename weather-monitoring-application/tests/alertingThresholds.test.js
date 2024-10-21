const { checkAlerts } = require('../controllers/weatherController');
const { alerts } = require('../data/dataStore');

// Define tempAlerts and windAlerts as objects in the test
let tempAlerts = {};
let windAlerts = {};

describe('Alerting Thresholds', () => {
  beforeEach(() => {
    // Reset alerts and counters
    alerts.length = 0;
    tempAlerts = {}; // Reset tempAlerts as an empty object
    windAlerts = {}; // Reset windAlerts as an empty object
  });

  it('should trigger temperature alert after consecutive breaches', async () => {
    await checkAlerts('Delhi', 36, 'Clear', 50, 10);
    await checkAlerts('Delhi', 37, 'Clear', 55, 12);
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveProperty('temp', '37.00');
    expect(alerts[0]).toHaveProperty('alertType', 'Temperature');
  });

  it('should not trigger temperature alert if breaches are not consecutive', async () => {
    await checkAlerts('Delhi', 36, 'Clear', 50, 10);
    await checkAlerts('Delhi', 34, 'Clear', 50, 10);
    await checkAlerts('Delhi', 37, 'Clear', 55, 12);
    expect(alerts.length).toBe(0);
  });

  it('should trigger wind speed alert after consecutive breaches', async () => {
    await checkAlerts('Delhi', 30, 'Clear', 50, 55);
    await checkAlerts('Delhi', 31, 'Clear', 55, 60);
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveProperty('windSpeed', '60.00');
    expect(alerts[0]).toHaveProperty('alertType', 'Wind Speed');
  });

  it('should not trigger wind speed alert if breaches are not consecutive', async () => {
    await checkAlerts('Delhi', 30, 'Clear', 50, 55);
    await checkAlerts('Delhi', 31, 'Clear', 55, 40);
    await checkAlerts('Delhi', 32, 'Clear', 60, 52);
    expect(alerts.length).toBe(0);
  });
});
