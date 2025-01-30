const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  trade: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);
