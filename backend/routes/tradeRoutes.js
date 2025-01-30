const express = require('express');
const router = express.Router();
const { getRecentTrades, addTrade } = require('../controllers/tradeController');


router.get('/', getRecentTrades);
router.post('/', addTrade);

module.exports = router;
