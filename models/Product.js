const mongoose = require('mongoose');

// Creating a schema of a product to create mongoose model
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Please enter a name for the product.'],
	},
	category: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
		required: [true, 'A product must falls under a category.'],
	},
	quantity: {
		type: Number,
		required: [true, 'Please enter the quantity.'],
	},
	price: {
		type: Number,
		required: [true, 'Please enter a price.'],
	},
	discount: {
		percentage: {
			type: Number,
			min: 0,
			max: 100,
		},
		from: {
			type: Date,
			default: Date.now(),
		},
		until: {
			type: Date,
			default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		},
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'Please enter a product description'],
	},
	images: {
		type: [
			{
				type: String,
				trim: true,
				required: [true, 'Please choose an image.'],
			},
		],
		required: [true, 'Please upload at least one image'],
	},
	sizes: [
		{
			type: String,
			trim: true,
			required: [true, 'Please enter sizes.'],
		},
	],
	colors: [
		{
			type: String,
			trim: true,
			required: [true, 'Please enter colors.'],
		},
	],
	avgRating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0,
	},
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
