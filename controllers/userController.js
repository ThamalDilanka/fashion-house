const User = require('../models/User');

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new user in the database
exports.createUser = async (req, res) => {
	console.log(req.body);
	try {
		/**
		 * create method accepts a user object of a User model.
		 * req.body is the object sent by client side in the request body
		 */
		const newUser = await User.create(req.body);

		/**
		 * sending enveloped user object that added to the db.
		 * status 201 for created.
		 */
		res.status(201).json({
			status: 'success',
			data: {
				user: newUser
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

// Read all the document in user collection
exports.getAllUsers = async (req, res) => {
	try {
		// // Creating a object that contain all the key value pairs of query parameters
		// const queryObject = { ...req.query };

		// // Creating a arry of keys should be ignored in the filtering
		// const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// // Delete the excluded fields from the query object
		// excludeFields.forEach(el => delete queryObject[el]);

		// Build the query
		const query = User.find(req.query);

		// Execute the query
		const users = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users
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
 * in user collection
 */
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				user
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
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				user
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
exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);

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
