const { convertKelvinToCelsius, convertKelvinToFahrenheit } = require('../utils/helpers');

describe('Temperature Conversion', () => {
  it('should convert Kelvin to Celsius correctly', () => {
    expect(convertKelvinToCelsius(0)).toBe(-273.15);
    expect(convertKelvinToCelsius(273.15)).toBe(0);
    expect(convertKelvinToCelsius(300)).toBeCloseTo(26.85, 2);
  });

  it('should convert Kelvin to Fahrenheit correctly', () => {
    expect(convertKelvinToFahrenheit(0)).toBeCloseTo(-459.67, 2);
    expect(convertKelvinToFahrenheit(255.372)).toBeCloseTo(0, 2);
    expect(convertKelvinToFahrenheit(300)).toBeCloseTo(80.33, 2);
  });
});
