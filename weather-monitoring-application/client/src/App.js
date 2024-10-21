// client/src/App.js

import React, { useEffect, useState } from 'react';
import {
  fetchDailySummaries,
  fetchAlerts,
  fetchForecastSummaries,
} from './services/api';
import WeatherSummary from './components/WeatherSummary';
import ForecastSummary from './components/ForecastSummary'; // New component
import Alerts from './components/Alerts';
import Charts from './components/Charts';
import { Container, Typography } from '@mui/material';
import ForecastCharts from './components/ForecastCharts';

function App() {
  const [summaries, setSummaries] = useState([]);
  const [forecastSummaries, setForecastSummaries] = useState([]); // New state
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const summariesResponse = await fetchDailySummaries();
        setSummaries(summariesResponse.data);

        const forecastResponse = await fetchForecastSummaries();
        setForecastSummaries(forecastResponse.data);

        const alertsResponse = await fetchAlerts();
        setAlerts(alertsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();

    const interval = setInterval(getData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" gutterBottom>
        Weather Monitoring Dashboard
      </Typography>
      <Alerts alerts={alerts} />
      <WeatherSummary summaries={summaries} />
      <ForecastSummary summaries={forecastSummaries} /> {/* New component */}
      <Charts summaries={summaries} />
      <ForecastCharts summaries={forecastSummaries} />
    </Container>
  );
}

export default App;
