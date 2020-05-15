const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

// localhost:8080/api/v1/reviews/
router
	.route('/')
	.post(authController.protect, reviewController.createReview)
	.get(reviewController.getAllReviews);

// localhost:8080/api/v1/reviews/
router
	.route('/:id')
	.get(reviewController.getReview)
	.patch(authController.protect, reviewController.updateReview)
	.delete(authController.protect, reviewController.deleteReview);

module.exports = router;
