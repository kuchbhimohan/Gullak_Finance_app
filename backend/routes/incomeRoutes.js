const express = require('express');
const incomeController = require('../controller/incomeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Create a new income record
router.post('/', incomeController.createIncome);

// Get all income records for a user
router.get('/', incomeController.getAllIncome);

// Get a specific income record
router.get('/:id', incomeController.getIncome);

// Update an income record
router.put('/:id', incomeController.updateIncome);

// Delete an income record
router.delete('/:id', incomeController.deleteIncome);

// Get recent incomes
router.get('/recent', incomeController.getRecentIncomes);

// Get all user incomes
router.get('/all', incomeController.getAllUserIncomes);

module.exports = router;