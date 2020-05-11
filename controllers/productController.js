const Product = require('../models/Product');
const multer = require('multer');
const sharp = require('sharp');
const dest = process.env.DOWNLOAD_DESTINATION

const multerStorage = multer.memoryStorage();

//multer filter - allow only image files to be uploaded
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true)
	} else {
		cb(new AppError('Not an image! please upload only images!', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});
exports.uploadProductImages = upload.fields([
	//{name: 'productImage',maxCount: 1}, - in case if u wnt to upload single image
	{ name: 'images', maxCount: 5 }
]);

exports.resizeProductImages = async (req, res, next) => {

	if (!req.files.images) return next();

	//images
	try {
		req.body.images = [];
		await Promise.all(
			req.files.images.map(async (file, i) => {
			const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

			await sharp(file.buffer)
				.resize(200, 200)
				.toFormat('jpeg')
				.jpeg({ quality: 90 })
				.toFile(`${__dirname}` + dest + `${filename}`);

			req.body.images.push(filename);
		})
		);
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
	console.log(req.body);
	next();
};


/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new product in the database
exports.createProduct = async (req, res) => {
	console.log("create product",req.body);
	try {
		/**
		 * create method accepts a product object of a Product model.
		 * req.body is the object sent by client side in the request body
		 */
		const newProduct = await Product.create(req.body);

		/**
		 * sending enveloped product object that added to the db.
		 * status 201 for created.
		 */
		res.status(201).json({
			status: 'success',
			data: {
				product: newProduct,
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

// Read all the document in product collection
exports.getAllProducts = async (req, res) => {
	try {
		// BASIC FILTERING
		// Create a shallow copy of query object
		const queryObject = { ...req.query };

		// The special parameters needs to be excluded from the filter
		const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// Remove excluded query parameters from the query object
		excludeFields.forEach((el) => delete queryObject[el]);

		// ADVANCED FILTERING
		// Convert query object in to String
		let queryString = JSON.stringify(queryObject);

		// Replace the gte, gt, lte, le words with $gte, $gt, $lte, $lt
		queryString = queryObject.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);

		// Build the query
		const query = Product.find(JSON.parse(queryString));

		// Execute the query
		const products = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: products.length,
			data: {
				products,
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
 * in product collection
 */
exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				product,
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
exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				product,
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
exports.deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

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
