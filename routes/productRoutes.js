const express = require('express');
const productController = require('./../controllers/productController');
const multer = require('multer');
const  upload = multer({dest: 'public/img/items'});

const router = express.Router();

// localhost:8080/api/v1/products/
router
	.route('/')
	.post(upload.single('photo'),productController.createProduct)
	.get(productController.getAllProducts);

// localhost:8080/api/v1/products/
router
	.route('/:id')
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct); 

module.exports = router;
