const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authorize } = require('../utils/authUtils');

// Define routes for order-related operations
router.get('/', authorize('admin'), orderController.getAllOrders);
router.post('/add', orderController.createOrder);

module.exports = router;
