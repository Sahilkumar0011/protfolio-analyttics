const Portfolio = require('../models/Portfolio');

// Fetch all portfolio data
exports.getPortfolioData = async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new portfolio data
exports.addPortfolioData = async (req, res) => {
  try {
    const { date, value } = req.body;
    const newPortfolio = new Portfolio({ date, value });
    await newPortfolio.save();
    res.json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
