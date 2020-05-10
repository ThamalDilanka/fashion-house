const Category = require('../models/Category');

// Creating a new category in the database
exports.createCategory = async (req, res) => {
	try {
		const newCategory = await Category.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				category: newCategory
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

// Read all the document in category collection
exports.getAllCategories = async (req, res) => {
	try {
		// Build the query
		const query = Category.find(req.query);

		// Execute the query
		const categories = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: categories.length,
			data: {
				categories
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
 * in category collection
 */
exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				category
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

// Update a document by given id. This only for patch method
exports.updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				category
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

// Delete a document by id
exports.deleteCategory = async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.params.id);

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
