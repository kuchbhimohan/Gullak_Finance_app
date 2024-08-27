const express = require('express');
const incomeController = require('../controller/incomeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Create a new income record
router.post('/', authMiddleware,incomeController.createIncome);

// Get all income records for a user
router.get('/user/:userId', incomeController.getAllIncome);

// Get a specific income record
router.get('/:id', incomeController.getIncome);

// Update an income record
router.put('/:id', incomeController.updateIncome);

// Delete an income record
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;