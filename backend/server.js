const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Dummy Data
const { strategies, portfolio, recentTrades } = require('./data');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Dummy Data Endpoint
app.get('/api/data', (req, res) => {
  res.json({
    strategies: strategies,
    portfolio: portfolio,
    recentTrades: recentTrades,
  });
});

// Import Routes
const strategyRoutes = require('./routes/strategyRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const tradeRoutes = require('./routes/tradeRoutes');

// Use Routes
app.use('/api/strategies', strategyRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/trades', tradeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
