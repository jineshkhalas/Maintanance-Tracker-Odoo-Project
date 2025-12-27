const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Route Imports
const equipmentRoutes = require('./routes/equipmentRoutes');
const requestRoutes = require('./routes/requestRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/equipment', equipmentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/teams', teamRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});