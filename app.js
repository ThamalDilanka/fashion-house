const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');

// Importing routes from the routes folder
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const orderRoutes = require(('./routes/orderRoutes'));
const reviewRoutes = require(('./routes/reviewRoutes'));

// Creating a Express application 
const app = express();

// Setting body parser to get access of request.body
app.use(bodyParser.json());

// Logging all the requests to the console in development environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Setting the routes to the app as middlewares
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/favourites', favouriteRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Handle unknown routes
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`
	})
});

module.exports = app;
