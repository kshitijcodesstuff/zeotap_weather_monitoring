// client/src/components/ForecastCharts.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function ForecastCharts({ summaries }) {
  const dataByCity = summaries.reduce((acc, summary) => {
    if (!acc[summary.city]) acc[summary.city] = [];
    acc[summary.city].push(summary);
    return acc;
  }, {});

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Forecast Trends
      </Typography>
      {Object.keys(dataByCity).map((city) => {
        const cityData = dataByCity[city];

        const data = {
          labels: cityData.map((s) => s.date),
          datasets: [
            {
              label: 'Average Temp (°C)',
              data: cityData.map((s) => parseFloat(s.averageTemp)),
              fill: false,
              borderColor: '#3f51b5',
            },
            // Add other datasets as needed
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        return (
          <div key={city}>
            <Typography variant="h5" gutterBottom>
              {city}
            </Typography>
            <Line data={data} options={options} />
          </div>
        );
      })}
    </div>
  );
}

export default ForecastCharts;
