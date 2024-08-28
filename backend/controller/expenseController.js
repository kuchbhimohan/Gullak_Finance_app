const Expense = require('../models/Expense');
const UserProfile = require('../models/UserProfile');
const mongoose = require('mongoose');

const expenseController = {
  // Create a new expense
  createExpense: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { amount, currency, tags, date, note } = req.body;
      
      // Get user's current balance
      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Check if user has sufficient balance
      if (userProfile.currentBalance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Insufficient funds in the account' });
      }

      const prev_amount = userProfile.currentBalance;
      const curr_amount = prev_amount - amount;

      const newExpense = new Expense({
        user: req.user._id,
        amount,
        currency,
        tags,
        date,
        note,
        prev_amount,
        curr_amount
      });

      const savedExpense = await newExpense.save({ session });

      // Update user's current balance
      userProfile.currentBalance = curr_amount;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        expense: savedExpense,
        newBalance: userProfile.currentBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  },

  // Get all expenses for a user
  getAllExpenses: async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific expense
  getExpense: async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an expense
  updateExpense: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { amount, currency, tags, date, note } = req.body;
      const oldExpense = await Expense.findById(req.params.id).session(session);
      if (!oldExpense) {
        throw new Error('Expense not found');
      }

      // Get user's current balance
      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Calculate the difference in amount
      const amountDifference = amount - oldExpense.amount;

      // Check if user has sufficient balance for the update
      if (userProfile.currentBalance < amountDifference) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Insufficient funds for this update' });
      }

      const prev_amount = userProfile.currentBalance;
      const curr_amount = prev_amount - amountDifference;

      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        { amount, currency, tags, date, note, prev_amount, curr_amount },
        { new: true, session, runValidators: true }
      );

      // Update user's current balance
      userProfile.currentBalance = curr_amount;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        expense: updatedExpense,
        newBalance: userProfile.currentBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an expense
  deleteExpense: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id).session(session);
      if (!deletedExpense) {
        throw new Error('Expense not found');
      }

      // Update user's current balance
      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const newBalance = userProfile.currentBalance + deletedExpense.amount;
      userProfile.currentBalance = newBalance;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ 
        message: 'Expense deleted successfully',
        newBalance: newBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = expenseController;