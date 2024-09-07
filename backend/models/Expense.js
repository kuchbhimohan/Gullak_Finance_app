const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  tags: {
    type: String,
    required: true
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

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;