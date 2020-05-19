const express = require('express');
const productController = require('./../controllers/productController');
const fileHandler = require('../util/fileHandler');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.post(authController.protect, productController.createProduct)
	.get(productController.getAllProducts);

router
	.route('/images')
	.post(
		authController.protect,
		fileHandler.uploadImages,
		fileHandler.resizeImages
	);

router
	.route('/:id')
	.get(productController.getProduct)
	.patch(authController.protect, productController.updateProduct)
	.delete(authController.protect, productController.deleteProduct);

module.exports = router;
