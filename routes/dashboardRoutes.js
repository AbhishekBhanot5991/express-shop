const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authorize } = require('../utils/authUtils');

// Define routes for dashboard-related operations
router.get('/sales', authorize('admin'), dashboardController.getSalesAnalytics);
router.get('/users', authorize('admin'), dashboardController.getUserStatistics);
router.put('/settings', authorize('admin'), dashboardController.updateSettings);

module.exports = router;
