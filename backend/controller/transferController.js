const Transfer = require('../models/Transfer');
const UserProfile = require('../models/UserProfile');
const mongoose = require('mongoose');

const transferController = {
  // Create a new transfer
  createTransfer: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { to, amount, currency, date, note } = req.body;
      
      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      if (userProfile.currentBalance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Insufficient funds in the account' });
      }

      const prev_amount = userProfile.currentBalance;
      const curr_amount = prev_amount - amount;

      const newTransfer = new Transfer({
        user: req.user._id,
        to,
        amount,
        currency,
        date,
        note,
        prev_amount,
        curr_amount
      });

      const savedTransfer = await newTransfer.save({ session });

      userProfile.currentBalance = curr_amount;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        transfer: savedTransfer,
        newBalance: userProfile.currentBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  },

  // Get all transfers for a user
  getAllTransfers: async (req, res) => {
    try {
      const transfers = await Transfer.find({ user: req.user._id }).sort({ date: -1 });
      res.json(transfers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transfers', error: error.message });
    }
  },

  // Get a specific transfer
  getTransfer: async (req, res) => {
    try {
      const transfer = await Transfer.findById(req.params.id);
      if (!transfer) {
        return res.status(404).json({ message: 'Transfer not found' });
      }
      res.status(200).json(transfer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a transfer
  updateTransfer: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { to, amount, currency, date, note } = req.body;
      const oldTransfer = await Transfer.findById(req.params.id).session(session);
      if (!oldTransfer) {
        throw new Error('Transfer not found');
      }

      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const amountDifference = amount - oldTransfer.amount;

      if (userProfile.currentBalance < amountDifference) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Insufficient funds for this update' });
      }

      const prev_amount = userProfile.currentBalance;
      const curr_amount = prev_amount - amountDifference;

      const updatedTransfer = await Transfer.findByIdAndUpdate(
        req.params.id,
        { to, amount, currency, date, note, prev_amount, curr_amount },
        { new: true, session, runValidators: true }
      );

      userProfile.currentBalance = curr_amount;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        transfer: updatedTransfer,
        newBalance: userProfile.currentBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a transfer
  deleteTransfer: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedTransfer = await Transfer.findByIdAndDelete(req.params.id).session(session);
      if (!deletedTransfer) {
        throw new Error('Transfer not found');
      }

      const userProfile = await UserProfile.findOne({ user: req.user._id }).session(session);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const newBalance = userProfile.currentBalance + deletedTransfer.amount;
      userProfile.currentBalance = newBalance;
      await userProfile.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ 
        message: 'Transfer deleted successfully',
        newBalance: newBalance
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: error.message });
    }
  },

  // Get recent transfers
  getRecentTransfers: async (req, res) => {
    try {
      const recentTransfers = await Transfer.find({ user: req.user._id })
        .sort({ date: -1 })
        .limit(5);
      res.json(recentTransfers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recent transfers', error: error.message });
    }
  },

  // Get all user transfers
  getAllUserTransfers: async (req, res) => {
    try {
      const allTransfers = await Transfer.find({ user: req.user._id }).sort({ date: -1 });
      res.json(allTransfers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all user transfers', error: error.message });
    }
  }
};

module.exports = transferController;