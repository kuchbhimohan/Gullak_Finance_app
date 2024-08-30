const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transfer = require('../models/Transfer');

const combinedTransactionController = {
  getRecentTransactions: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;

      const [incomes, expenses, transfers] = await Promise.all([
        Income.find({ user: req.user._id }).sort({ date: -1 }).lean(),
        Expense.find({ user: req.user._id }).sort({ date: -1 }).lean(),
        Transfer.find({ user: req.user._id }).sort({ date: -1 }).lean()
      ]);

      const allTransactions = [
        ...incomes.map(income => ({ ...income, type: 'income' })),
        ...expenses.map(expense => ({ ...expense, type: 'expense' })),
        ...transfers.map(transfer => ({ ...transfer, type: 'transfer' }))
      ];

      // Sort all transactions by date in descending order
      allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

      const paginatedTransactions = allTransactions.slice(skip, skip + limit);

      res.json({
        transactions: paginatedTransactions,
        hasMore: allTransactions.length > skip + limit,
        totalCount: allTransactions.length
      });
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      res.status(500).json({ message: 'Error fetching recent transactions', error: error.message });
    }
  },

  getAllTransactions: async (req, res) => {
    try {
      const [incomes, expenses, transfers] = await Promise.all([
        Income.find({ user: req.user._id }).sort({ date: -1 }).lean(),
        Expense.find({ user: req.user._id }).sort({ date: -1 }).lean(),
        Transfer.find({ user: req.user._id }).sort({ date: -1 }).lean()
      ]);

      const allTransactions = [
        ...incomes.map(income => ({ ...income, type: 'income' })),
        ...expenses.map(expense => ({ ...expense, type: 'expense' })),
        ...transfers.map(transfer => ({ ...transfer, type: 'transfer' }))
      ];

      // Sort all transactions by date in descending order
      allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json({
        transactions: allTransactions,
        totalCount: allTransactions.length
      });
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      res.status(500).json({ message: 'Error fetching all transactions', error: error.message });
    }
  },

  getTransactionsByType: async (req, res) => {
    try {
      const { type } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let transactions;
      let totalCount;

      switch (type) {
        case 'income':
          transactions = await Income.find({ user: req.user._id })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          totalCount = await Income.countDocuments({ user: req.user._id });
          break;
        case 'expense':
          transactions = await Expense.find({ user: req.user._id })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          totalCount = await Expense.countDocuments({ user: req.user._id });
          break;
        case 'transfer':
          transactions = await Transfer.find({ user: req.user._id })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
          totalCount = await Transfer.countDocuments({ user: req.user._id });
          break;
        default:
          return res.status(400).json({ message: 'Invalid transaction type' });
      }

      res.json({
        transactions: transactions.map(t => ({ ...t, type })),
        hasMore: totalCount > skip + limit,
        totalCount
      });
    } catch (error) {
      console.error(`Error fetching ${req.params.type} transactions:`, error);
      res.status(500).json({ message: `Error fetching ${req.params.type} transactions`, error: error.message });
    }
  },

  getTransactionStats: async (req, res) => {
    try {
      const [incomeCount, expenseCount, transferCount] = await Promise.all([
        Income.countDocuments({ user: req.user._id }),
        Expense.countDocuments({ user: req.user._id }),
        Transfer.countDocuments({ user: req.user._id })
      ]);

      const totalCount = incomeCount + expenseCount + transferCount;

      res.json({
        income: incomeCount,
        expense: expenseCount,
        transfer: transferCount,
        total: totalCount
      });
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      res.status(500).json({ message: 'Error fetching transaction stats', error: error.message });
    }
  }
};

module.exports = combinedTransactionController;