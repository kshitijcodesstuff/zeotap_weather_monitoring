// utils/helpers.js
function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
  

function convertKelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * (9 / 5) + 32;
  }
  function getCurrentDate(dt) {
    const date = new Date(dt * 1000);
    return date.toISOString().split('T')[0];
  }
  
  module.exports = {
    convertKelvinToCelsius,
    convertKelvinToFahrenheit,
    getCurrentDate,
  };
  