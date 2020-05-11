const Product = require('../models/Product');

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new product in the database
exports.createProduct = async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				product: newProduct,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Read all the document in product collection
exports.getAllProducts = async (req, res) => {
	try {
		// BASIC FILTERING
		// Create a shallow copy of query object
		const queryObject = { ...req.query };

		// The special parameters needs to be excluded from the filter
		const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// Remove excluded query parameters from the query object
		excludeFields.forEach((el) => delete queryObject[el]);

		// ADVANCED FILTERING
		// Convert query object in to String
		let queryString = JSON.stringify(queryObject);

		// Replace the gte, gt, lte, le words with $gte, $gt, $lte, $lt
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);

		// Build the query
		const query = Product.find(JSON.parse(queryString));

		// Execute the query
		const products = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: products.length,
			data: {
				products,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

/**
 * Read a specific document by id that passed as query parameter
 * in product collection
 */
exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				product,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Update a document by given id. This only for patch method
exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				product,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Delete a document by id
exports.deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
