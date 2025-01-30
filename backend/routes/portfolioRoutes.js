const express = require('express');
const router = express.Router();
const { getPortfolioData, addPortfolioData } = require('../controllers/portfolioController');


router.get('/', getPortfolioData);


router.post('/', addPortfolioData);

module.exports = router;
