const express = require('express');
const orderController = require('./../controllers/orderController');

const router = express.Router();

// localhost:8080/api/v1/orders/
router
	.route('/')
	.post(orderController.createOrder)
	.get(orderController.getAllOrders);

// localhost:8080/api/v1/orders/
router
	.route('/:id')
	.get(orderController.getOrder)
	.patch(orderController.updateOrder)
	.delete(orderController.deleteOrder);

module.exports = router;
