const express = require('express');
const router = express.Router();
const userInfoController = require('../controller/userInfoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);  // Apply auth middleware to all routes in this file

router.get('/info', userInfoController.getUserInfo);
router.get('/transaction-counts', userInfoController.getTransactionCounts);
router.get('/recent-transactions', userInfoController.getRecentTransactions);

module.exports = router;