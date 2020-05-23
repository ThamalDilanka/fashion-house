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
		min: 0,
	},
	price: {
		type: Number,
		required: [true, 'Please enter a price.'],
	},
	discount: {
		percentage: {
      type: Number,
      default: 0
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
			},
		],
		required: [true, 'Please choose atleast one image.'],
	},
	sizes: {
		type: [
			{
				type: String,
				trim: true,
			},
		],
		required: [true, 'Please enter atleast one size.'],
	},
	colors: {
		type: [
			{
				name: {
					type: String,
					trim: true,
				},
				code: {
					type: String,
					trim: true,
				},
			},
		],
		required: [true, 'Please enter atleast one color.'],
	},
	avgRating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0,
	},
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
