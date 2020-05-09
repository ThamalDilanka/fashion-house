const express = require('express');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router
	.route('/')
	.post(cartController.createCart)
	.get(cartController.getAllCarts);

router
	.route('/:id')
	.get(cartController.getCart)
	.patch(cartController.updateCart)
	.delete(cartController.deleteCart);

module.exports = router;
