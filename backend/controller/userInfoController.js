const UserProfile = require('../models/UserProfile');
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transfer = require('../models/Transfer');

exports.getUserInfo = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.user._id }).select('name gender currentBalance');
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json({
      name: userProfile.name,
      gender: userProfile.gender,
      currentBalance: userProfile.currentBalance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
};

exports.getTransactionCounts = async (req, res) => {
  try {
    const incomeCount = await Income.countDocuments({ user: req.user._id });
    const expenseCount = await Expense.countDocuments({ user: req.user._id });
    const transferCount = await Transfer.countDocuments({ user: req.user._id });
    
    res.json({
      income: incomeCount,
      expense: expenseCount,
      transfer: transferCount,
      total: incomeCount + expenseCount + transferCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction counts', error: error.message });
  }
};

exports.getRecentTransactions = async (req, res) => {
  try {
    const recentIncome = await Income.find({ user: req.user._id }).sort({ date: -1 }).limit(5);
    const recentExpenses = await Expense.find({ user: req.user._id }).sort({ date: -1 }).limit(5);
    const recentTransfers = await Transfer.find({ user: req.user._id }).sort({ date: -1 }).limit(5);

    const allTransactions = [...recentIncome, ...recentExpenses, ...recentTransfers]
      .sort((a, b) => b.date - a.date)
      .slice(0, 10);

    res.json(allTransactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent transactions', error: error.message });
  }
};