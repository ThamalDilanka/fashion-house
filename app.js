const express = require('express');
const morgan = require('morgan');

// Importing routes from the routes folder
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Creating a Express application
const app = express();

// Logging all the requests to the console in development environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Setting the routes to the app as middlewares
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/favourites', favouriteRoutes);
app.use('/api/v1/comments', commentRoutes);

module.exports = app;
