// client/src/components/ForecastSummary.js

import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { WbSunny, Opacity, Air } from '@mui/icons-material';

function ForecastSummary({ summaries }) {
  if (!summaries || summaries.length === 0) {
    return <Typography>Loading forecast summaries...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Weather Forecast Summaries
      </Typography>
      <Grid container spacing={3}>
        {summaries.map((summary) => (
          <Grid item xs={12} sm={6} md={4} key={`${summary.city}-${summary.date}`}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  {summary.city} - {summary.date}
                </Typography>
                <Typography variant="body1">
                  <WbSunny /> <strong>Average Temp:</strong> {summary.averageTemp}°C
                </Typography>
                <Typography variant="body1">
                  <WbSunny /> <strong>Max Temp:</strong> {summary.maxTemp}°C
                </Typography>
                <Typography variant="body1">
                  <WbSunny /> <strong>Min Temp:</strong> {summary.minTemp}°C
                </Typography>
                <Typography variant="body1">
                  <Opacity /> <strong>Average Humidity:</strong> {summary.averageHumidity}%
                </Typography>
                <Typography variant="body1">
                  <Air /> <strong>Average Wind Speed:</strong> {summary.averageWindSpeed} km/h
                </Typography>
                <Typography variant="body1">
                  <strong>Dominant Condition:</strong> {summary.dominantCondition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ForecastSummary;
