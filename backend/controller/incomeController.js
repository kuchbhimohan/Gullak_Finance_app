const Income = require('../models/Income');
const UserProfile = require('../models/UserProfile');
const mongoose = require('mongoose');

const incomeController = {
  // Create a new income record
  createIncome: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { amount, currency, tags, date, note } = req.body;
      
      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const pretransac_amount = userProfile.currentBalance;
      const posttransac_amount = pretransac_amount + amount;

      const newIncome = new Income({
        user: req.user._id,
        amount,
        currency,
        tags,
        date,
        note,
        pretransac_amount,
        posttransac_amount
      });

      const savedIncome = await newIncome.save({ session });

      userProfile.currentBalance = posttransac_amount;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        income: savedIncome,
        newBalance: userProfile.currentBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  },

  // Get all income records for a user
  getAllIncome: async (req, res) => {
    try {
      const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
      res.json(incomes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching incomes', error: error.message });
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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { amount, currency, tags, date, note } = req.body;
      const oldIncome = await Income.findById(req.params.id).session(session);
      if (!oldIncome) {
        throw new Error('Income record not found');
      }

      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const amountDifference = amount - oldIncome.amount;
      const pretransac_amount = userProfile.currentBalance;
      const posttransac_amount = pretransac_amount + amountDifference;

      const updatedIncome = await Income.findByIdAndUpdate(
        req.params.id,
        { amount, currency, tags, date, note, pretransac_amount, posttransac_amount },
        { new: true, session, runValidators: true }
      );

      userProfile.currentBalance = posttransac_amount;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        income: updatedIncome,
        newBalance: userProfile.currentBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an income record
  deleteIncome: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedIncome = await Income.findByIdAndDelete(req.params.id).session(session);
      if (!deletedIncome) {
        throw new Error('Income record not found');
      }

      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const newBalance = userProfile.currentBalance - deletedIncome.amount;
      userProfile.currentBalance = newBalance;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ 
        message: 'Income record deleted successfully',
        newBalance: newBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: error.message });
    }
  },

  // Get recent incomes
  getRecentIncomes: async (req, res) => {
    try {
      const recentIncomes = await Income.find({ user: req.user._id })
        .sort({ date: -1 })
        .limit(5);
      res.json(recentIncomes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recent incomes', error: error.message });
    }
  },

  // Get all user incomes
  getAllUserIncomes: async (req, res) => {
    try {
      const allIncomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
      res.json(allIncomes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all user incomes', error: error.message });
    }
  }
};

module.exports = incomeController;