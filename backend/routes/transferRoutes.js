const express = require('express');
const router = express.Router();
const transferController = require('../controller/transferController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Create a new transfer
router.post('/', transferController.createTransfer);

// Get all transfers for a user
router.get('/', transferController.getAllTransfers);

// Get a specific transfer
router.get('/:id', transferController.getTransfer);

// Update a transfer
router.put('/:id', transferController.updateTransfer);

// Delete a transfer
router.delete('/:id', transferController.deleteTransfer);

// Get recent transfers
router.get('/recent', transferController.getRecentTransfers);

// Get all user transfers
router.get('/all', transferController.getAllUserTransfers);

module.exports = router;