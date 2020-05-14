const express = require('express');
const categoryController = require('./../controllers/categoryController');
const fileHandler = require('../util/fileHandler');

const router = express.Router();

router
	.route('/')
	.post(fileHandler.uploadImages, fileHandler.resizeImages, categoryController.createCategory)
	.get(categoryController.getAllCategories);

router
	.route('/:id')
	.get(categoryController.getCategory)
	.patch(categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

module.exports = router;
