const express = require('express');
const favouriteController = require('./../controllers/favouriteController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.post(authController.protect, favouriteController.createFavourite)
	.get(authController.protect, favouriteController.getAllFavourites);

router
	.route('/:id')
	.get(authController.protect, favouriteController.getFavourite)
	.patch(authController.protect, favouriteController.updateFavourite)
	.delete(authController.protect, favouriteController.deleteFavourite);

module.exports = router;
