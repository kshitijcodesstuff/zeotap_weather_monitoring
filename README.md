# **Weather Monitoring Application**

## **Overview**
This application is a real-time weather monitoring system designed to fetch, process, and visualize weather data from Indian metros using the OpenWeatherMap API. It continuously tracks weather conditions, calculates daily summaries, forecasts weather trends, and triggers alerts based on user-defined thresholds. The frontend provides a clean dashboard for visualizing weather data, daily summaries, forecast trends, and alerts.

### **Features**
- Real-time weather data fetching for major Indian metros (e.g., Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- Daily weather summaries with average, maximum, minimum temperatures, humidity, and wind speeds.
- Forecast summaries based on 5-day weather forecasts.
- Alerting system for temperature and wind speed breaches based on user-configurable thresholds.
- Visualizations of weather trends and forecast trends using line charts.
- Dashboard to view daily weather summaries, forecast summaries, and triggered alerts.

## **Tech Stack**
- **Backend**: Node.js, Express, Axios, node-cron
- **Frontend**: React, Material UI, Chart.js
- **Utilities**: Helper functions for temperature conversion and data processing

## **Prerequisites**
- Node.js installed on your system
- OpenWeatherMap API key (sign up at [OpenWeatherMap](https://openweathermap.org/) to obtain a free API key)

## **Installation and Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/kshitijcodesstuff/zeotap_weather_monitoring.git
cd weather-monitoring-application
```

### **2. Backend Setup**
1. Navigate to the root directory:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   - The backend server will start running on `http://localhost:5002`.

### **3. Frontend Setup**
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   - The frontend server will start running on `http://localhost:3000`.

### **4. Running Tests**
- To run the test cases for the backend, navigate to the root of the project (`weather-monitoring-application`) and run:
  ```bash
  npm test
  ```
  - This will execute the test cases and display the results in the terminal.

## **Usage**
- **Weather Dashboard**: Access the dashboard on `http://localhost:3000` to view real-time weather data, daily summaries, forecast summaries, alerts, and trend charts.
- **Weather Data**: Displays average, maximum, minimum temperatures, humidity, wind speeds, and dominant weather condition.
- **Alerts**: Shows temperature or wind speed alerts when thresholds are breached for consecutive updates.
- **Charts**: Displays line charts for average temperature, humidity, and wind speed trends over time.
- **Forecast Trends**: Shows forecast trends for the next 5 days based on forecast data from OpenWeatherMap.

## **Bonus Features**
- Integration of additional parameters like humidity and wind speed.
- Forecast-based weather summaries for the next 5 days.
- Extended alerting functionality for additional weather parameters.

## **Contributing**
Feel free to open issues or submit pull requests for improvements and additional features.


