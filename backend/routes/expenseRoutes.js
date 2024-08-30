const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Create a new expense
router.post('/', expenseController.createExpense);

// Get all expenses for a user
router.get('/', expenseController.getAllExpenses);

// Get a specific expense
router.get('/:id', expenseController.getExpense);

// Update an expense
router.put('/:id', expenseController.updateExpense);

// Delete an expense
router.delete('/:id', expenseController.deleteExpense);

// Get recent expenses
router.get('/recent', expenseController.getRecentExpenses);

// Get all user expenses
router.get('/all', expenseController.getAllUserExpenses);

module.exports = router;