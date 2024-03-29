const express = require('express');
// const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');
const {authorize} = require('../utils/authUtils');
const upload = require('../utils/imageUtils');

// For admin-only routes
router.post('/add', authorize('admin'),upload.single('image'),productController.addProduct);
router.put('/edit/:id', authorize('admin'),productController.editProduct);
router.patch('/edit/:id/image', authorize('admin'), upload.single('image'), productController.updateProductImage);
router.delete('/:id', authorize('admin'),productController.deleteProduct);
// For user-only routes
router.get('/',productController.getAllProducts);
module.exports = router;