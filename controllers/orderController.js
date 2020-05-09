const Order = require('../models/Order');

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new order in the database
exports.createOrder = async (req, res) => {
	console.log(req.body);
	try {
		/**
		 * create method accepts a order object of a Order model.
		 * req.body is the object sent by client side in the request body
		 */
		const newOrder = await Order.create(req.body);

		/**
		 * sending enveloped order object that added to the db.
		 * status 201 for created.
		 */
		res.status(201).json({
			status: 'success',
			data: {
				order: newOrder
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************               Read              **********************/
/////////////////////////////////////////////////////////////////////////////

// Read all the document in order collection
exports.getAllOrders = async (req, res) => {
	try {
		// // Creating a object that contain all the key value pairs of query parameters
		// const queryObject = { ...req.query };

		// // Creating a arry of keys should be ignored in the filtering
		// const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// // Delete the excluded fields from the query object
		// excludeFields.forEach(el => delete queryObject[el]);

		// Build the query
		const query = Order.find(req.query);

		// Execute the query
		const orders = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: orders.length,
			data: {
				orders
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

/**
 * Read a specific document by id that passed as query parameter
 * in order collection
 */
exports.getOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				order
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************              Update             **********************/
/////////////////////////////////////////////////////////////////////////////

// Update a document by given id. This only for patch method
exports.updateOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				order
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************              Delete             **********************/
/////////////////////////////////////////////////////////////////////////////

// Delete a document by id
exports.deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};
