const express = require('express');
const router = express.Router();
const combinedTransactionController = require('../controller/combinedTransactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Get recent transactions (paginated)
router.get('/recent', combinedTransactionController.getRecentTransactions);

// Get all transactions
router.get('/all', combinedTransactionController.getAllTransactions);

module.exports = router;