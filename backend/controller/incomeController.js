const Income = require('../models/Income');

const incomeController = {
  // Create a new income record
  createIncome: async (req, res) => {
    try {
      const {amount, currency, tags, date, note } = req.body;
      
      const newIncome = new Income({
        user:req.user._id,
        amount,
        currency,
        tags,
        date,
        note
      });

      const savedIncome = await newIncome.save();
      res.status(201).json(savedIncome);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all income records for a user
  getAllIncome: async (req, res) => {
    try {
      const userId = req.params.userId;
      const incomes = await Income.find({ user: userId }).sort({ date: -1 });
      res.status(200).json(incomes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific income record
  getIncome: async (req, res) => {
    try {
      const income = await Income.findById(req.params.id);
      if (!income) {
        return res.status(404).json({ message: 'Income record not found' });
      }
      res.status(200).json(income);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an income record
  updateIncome: async (req, res) => {
    try {
      const { amount, currency, tags, date, note } = req.body;
      const updatedIncome = await Income.findByIdAndUpdate(
        req.params.id,
        { amount, currency, tags, date, note },
        { new: true }
      );
      if (!updatedIncome) {
        return res.status(404).json({ message: 'Income record not found' });
      }
      res.status(200).json(updatedIncome);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an income record
  deleteIncome: async (req, res) => {
    try {
      const deletedIncome = await Income.findByIdAndDelete(req.params.id);
      if (!deletedIncome) {
        return res.status(404).json({ message: 'Income record not found' });
      }
      res.status(200).json({ message: 'Income record deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = incomeController;