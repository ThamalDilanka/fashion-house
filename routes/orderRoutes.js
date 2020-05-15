const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

// localhost:8080/api/v1/orders/
router
	.route('/')
	.post(authController.protect, orderController.createOrder)
	.get(authController.protect, orderController.getAllOrders);

// localhost:8080/api/v1/orders/
router
	.route('/:id')
	.get(authController.protect, orderController.getOrder)
	.patch(authController.protect, orderController.updateOrder)
	.delete(authController.protect, orderController.deleteOrder);

module.exports = router;
