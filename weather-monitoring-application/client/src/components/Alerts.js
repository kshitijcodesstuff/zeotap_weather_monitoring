// client/src/components/Alerts.js
import React from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';

function Alerts({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return null; // Return null if no alerts
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Alerts
      </Typography>
      {alerts.map((alert, index) => (
        <Alert severity="warning" key={index}>
          <AlertTitle>Alert for {alert.city}</AlertTitle>
          <strong>Temperature:</strong> {alert.temp}°C — {alert.condition}
          <br />
          <strong>Wind Speed:</strong> {alert.windSpeed} km/h
          <br />
          <strong>Time:</strong> {new Date(alert.time).toLocaleString()}
        </Alert>
      ))}
    </div>
  );
}

export default Alerts;
