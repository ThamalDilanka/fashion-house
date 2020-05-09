const express = require('express');
const favouriteController = require('./../controllers/favouriteController');

const router = express.Router();

// localhost:8080/api/v1/favourites/
router
	.route('/')
	.post(favouriteController.createFavourite)
	.get(favouriteController.getAllFavourites);

// localhost:8080/api/v1/favourites/
router
	.route('/:id')
	.get(favouriteController.getFavourite)
	.patch(favouriteController.updateFavourite)
	.delete(favouriteController.deleteFavourite);

module.exports = router;
