const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR']
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String
  },
  prev_amount: {
    type: Number,
    required: true
  },
  curr_amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Transfer = mongoose.model('Transfer', TransferSchema);

module.exports = Transfer;