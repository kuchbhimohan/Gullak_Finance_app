// Example: dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/monthly-financial-data', authMiddleware, dashboardController.getMonthlyFinancialData);
router.get('/financial-distribution', authMiddleware, dashboardController.getFinancialDistribution);
router.get('/income-vs-expenditure', authMiddleware, dashboardController.getIncomeVsExpenditure);

module.exports = router;