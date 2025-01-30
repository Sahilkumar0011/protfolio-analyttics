const Strategy = require('../models/Strategy');

// Fetch all strategies
exports.getAllStrategies = async (req, res) => {
  try {
    const strategies = await Strategy.find();
    res.json(strategies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.addStrategy = async (req, res) => {
  try {
    const { name, roi, cagr, drawdown } = req.body;
    const newStrategy = new Strategy({ name, roi, cagr, drawdown });
    await newStrategy.save();
    res.json(newStrategy);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
