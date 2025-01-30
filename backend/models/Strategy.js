const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
  name: { type: String, required: true },
  roi: { type: Number, required: true },
  cagr: { type: Number, required: true },
  drawdown: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Strategy', strategySchema);
