// client/src/components/Charts.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';

// **Import Chart.js components**
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

// **Register the components**
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function Charts({ summaries }) {
  const dataByCity = summaries.reduce((acc, summary) => {
    if (!acc[summary.city]) acc[summary.city] = [];
    acc[summary.city].push(summary);
    return acc;
  }, {});

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Weather Trends
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
            {
              label: 'Average Humidity (%)',
              data: cityData.map((s) => parseFloat(s.averageHumidity)),
              fill: false,
              borderColor: '#82ca9d',
            },
            {
              label: 'Average Wind Speed (km/h)',
              data: cityData.map((s) => parseFloat(s.averageWindSpeed)),
              fill: false,
              borderColor: '#ffc658',
            },
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

export default Charts;
