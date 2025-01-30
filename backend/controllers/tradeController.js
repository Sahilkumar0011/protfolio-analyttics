const Trade = require('../models/Trade');

// Fetch all recent trades
exports.getRecentTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new trade
exports.addTrade = async (req, res) => {
  try {
    const { date, trade } = req.body;
    const newTrade = new Trade({ date, trade });
    await newTrade.save();
    res.json(newTrade);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
