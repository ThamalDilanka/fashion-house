const Review = require('../models/Review');
const APIFeatures = require('../util/apiFeatures');

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new review in the database
exports.createReview = async (req, res) => {
	console.log(req.body);
	try {
		/**
		 * create method accepts a review object of a Review model.
		 * req.body is the object sent by client side in the request body
		 */
		const newReview = await Review.create(req.body);

		/**
		 * sending enveloped review object that added to the db.
		 * status 201 for created.
		 */
		res.status(201).json({
			status: 'success',
			data: {
				review: newReview,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************               Read              **********************/
/////////////////////////////////////////////////////////////////////////////

// Read all the document in review collection
exports.getAllReviews = async (req, res) => {
	try {
		// Execute the query
		const features = new APIFeatures(Review.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const reviews = await features.query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: reviews.length,
			data: {
				reviews,
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
 * in review collection
 */
exports.getReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				review,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************              Update             **********************/
/////////////////////////////////////////////////////////////////////////////

// Update a document by given id. This only for patch method
exports.updateReview = async (req, res) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				review,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************              Delete             **********************/
/////////////////////////////////////////////////////////////////////////////

// Delete a document by id
exports.deleteReview = async (req, res) => {
	try {
		await Review.findByIdAndDelete(req.params.id);

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
