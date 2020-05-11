const express = require('express');
const productController = require('./../controllers/productController');
const fileHandler = require('../util/fileHandler');

const router = express.Router();

// localhost:8080/api/v1/products/
router
	.route('/')
	.post(fileHandler.uploadImages, fileHandler.resizeImages, productController.createProduct)
	.get(productController.getAllProducts);

// localhost:8080/api/v1/products/
router
	.route('/:id')
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct); 

module.exports = router;
