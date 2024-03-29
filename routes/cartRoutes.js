const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authorize } = require('../utils/authUtils');

// Define routes for cart-related operations
router.get('/', authorize('user'), cartController.getCartItems);
router.post('/add', authorize('user'), cartController.addToCart);

module.exports = router;
