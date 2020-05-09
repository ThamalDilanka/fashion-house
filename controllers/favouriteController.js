const Favourite = require('../models/Favourite');

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new favourite in the database
exports.createFavourite = async (req, res) => {
	console.log(req.body);
	try {
		/**
		 * create method accepts a favourite object of a Favourite model.
		 * req.body is the object sent by client side in the request body
		 */
		const newFavourite = await Favourite.create(req.body);

		/**
		 * sending enveloped favourite object that added to the db.
		 * status 201 for created.
		 */
		res.status(201).json({
			status: 'success',
			data: {
				favourite: newFavourite
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

// Read all the document in favourite collection
exports.getAllFavourites = async (req, res) => {
	try {
		// // Creating a object that contain all the key value pairs of query parameters
		// const queryObject = { ...req.query };

		// // Creating a arry of keys should be ignored in the filtering
		// const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// // Delete the excluded fields from the query object
		// excludeFields.forEach(el => delete queryObject[el]);

		// Build the query
		const query = Favourite.find(req.query);

		// Execute the query
		const favourites = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: favourites.length,
			data: {
				favourites
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
 * in favourite collection
 */
exports.getFavourite = async (req, res) => {
	try {
		const favourite = await Favourite.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				favourite
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
exports.updateFavourite = async (req, res) => {
	try {
		const favourite = await Favourite.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				favourite
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
exports.deleteFavourite = async (req, res) => {
	try {
		await Favourite.findByIdAndDelete(req.params.id);

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
