const express = require('express');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

// localhost:8080/api/v1/reviews/
router
	.route('/')
	.post(reviewController.createReview)
	.get(reviewController.getAllReviews);

// localhost:8080/api/v1/reviews/
router
	.route('/:id')
	.get(reviewController.getReview)
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

module.exports = router;
