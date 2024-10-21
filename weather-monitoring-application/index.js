require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Mount the weather routes
app.use('/api', weatherRoutes);

// Set up the port based on the environment
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 5003 : 5002);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
