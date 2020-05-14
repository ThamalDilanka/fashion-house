const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.post(authController.protect, cartController.createCart)
	.get(authController.protect, cartController.getAllCarts);

router
	.route('/:id')
	.get(authController.protect, cartController.getCart)
	.patch(authController.protect, cartController.updateCart)
	.delete(authController.protect, cartController.deleteCart);

module.exports = router;
