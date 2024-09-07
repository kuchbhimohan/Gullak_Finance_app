const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transfer = require('../models/Transfer');

exports.getMonthlyFinancialData = async (req, res) => {
  const year = parseInt(req.query.year);
  const userId = req.user._id;
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalExpense: { $sum: "$amount" }
        }
      }
    ]);

    const transfers = await Transfer.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalTransfer: { $sum: "$amount" }
        }
      }
    ]);

    const incomes = await Income.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalIncome: { $sum: "$amount" }
        }
      }
    ]);

    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(year, index).toLocaleString('default', { month: 'short' }),
      expenditure: 0,
      income: 0
    }));

    expenses.forEach(expense => {
      monthlyData[expense._id - 1].expenditure += expense.totalExpense;
    });

    transfers.forEach(transfer => {
      monthlyData[transfer._id - 1].expenditure += transfer.totalTransfer;
    });

    incomes.forEach(income => {
      monthlyData[income._id - 1].income = income.totalIncome;
    });

    res.json(monthlyData);
  } catch (error) {
    console.error('Error fetching monthly financial data:', error);
    res.status(500).json({ message: "Error fetching monthly financial data", error: error.message });
  }
};

exports.getFinancialDistribution = async (req, res) => {
  const { year, month } = req.query;
  const userId = req.user._id;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: "$tags",
          value: { $sum: "$amount" }
        }
      },
      {
        $project: {
          name: "$_id",
          value: 1,
          _id: 0
        }
      }
    ]);

    const transfers = await Transfer.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          value: { $sum: "$amount" }
        }
      },
      {
        $project: {
          name: "Transfers",
          value: 1,
          _id: 0
        }
      }
    ]);

    const distributionData = [...expenses, ...transfers];

    if (distributionData.length === 0) {
      return res.json({ message: "No expenses or transfers for this period." });
    }

    res.json(distributionData);
  } catch (error) {
    console.error('Error fetching financial distribution:', error);
    res.status(500).json({ message: "Error fetching financial distribution", error: error.message });
  }
};

exports.getIncomeVsExpenditure = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.user._id;

  try {
    const incomes = await Income.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalIncome: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const expenditures = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalExpense: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const transfers = await Transfer.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalTransfer: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const result = {};
    incomes.forEach(income => {
      result[income._id] = { date: income._id, income: income.totalIncome, expenditure: 0 };
    });

    expenditures.forEach(expense => {
      if (result[expense._id]) {
        result[expense._id].expenditure += expense.totalExpense;
      } else {
        result[expense._id] = { date: expense._id, income: 0, expenditure: expense.totalExpense };
      }
    });

    transfers.forEach(transfer => {
      if (result[transfer._id]) {
        result[transfer._id].expenditure += transfer.totalTransfer;
      } else {
        result[transfer._id] = { date: transfer._id, income: 0, expenditure: transfer.totalTransfer };
      }
    });

    const finalResult = Object.values(result).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(finalResult);
  } catch (error) {
    console.error('Error fetching income vs expenditure data:', error);
    res.status(500).json({ message: "Error fetching income vs expenditure data", error: error.message });
  }
};