const express = require('express');
const categoryController = require('./../controllers/categoryController');
const fileHandler = require('../util/fileHandler');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.post(authController.protect, categoryController.createCategory)
	.get(categoryController.getAllCategories);

router
	.route('/:id')
	.get(categoryController.getCategory)
	.patch(authController.protect, categoryController.updateCategory)
	.delete(authController.protect, categoryController.deleteCategory);

module.exports = router;
