const Cart = require('../models/Cart');

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new cart in the database
exports.createCart = async (req, res) => {
	console.log(req.body);
	try {
		/**
		 * create method accepts a cart object of a Cart model.
		 * req.body is the object sent by client side in the request body
		 */
		const newCart = await Cart.create(req.body);

		/**
		 * sending enveloped cart object that added to the db.
		 * status 201 for created.
		 */
		res.status(201).json({
			status: 'success',
			data: {
				cart: newCart
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

// Read all the document in cart collection
exports.getAllCarts = async (req, res) => {
	try {
		// // Creating a object that contain all the key value pairs of query parameters
		// const queryObject = { ...req.query };

		// // Creating a arry of keys should be ignored in the filtering
		// const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// // Delete the excluded fields from the query object
		// excludeFields.forEach(el => delete queryObject[el]);

		// Build the query
		const query = Cart.find(req.query);

		// Execute the query
		const carts = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: carts.length,
			data: {
				carts
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
 * in cart collection
 */
exports.getCart = async (req, res) => {
	try {
		const cart = await Cart.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				cart
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
exports.updateCart = async (req, res) => {
	try {
		const cart = await Cart.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				cart
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
exports.deleteCart = async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);

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
