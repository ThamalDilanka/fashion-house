const Product = require('../models/Product');
const multer = require('multer');
const sharp = require('sharp');
const dest = process.env.DOWNLOAD_DESTINATION

// const multerStorage = multer.diskStorage({
// 	destination: (req,file,cb) => {
// 		cb(null,`${__dirname}`+dest );
// 	},
// 	filename: (req,file,cb) => {
// 		//uesr-id
// 		const ext = file.mimetype.split('/')[1];
// 		cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname)+ext); //asign file name

// 	}
// });
const multerStorage = multer.memoryStorage();

//multer filter - allow only image files to be uploaded
const multerFilter = (req,file,cb) => {
	if(file.mimetype.startsWith('image')){
		cb(null,true)
	}else{
		cb(new AppError('Not an image! please upload only images!',400),false);
	}
};

const  upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});
exports.uploadProductImages = upload.fields([
	//{name: 'productImage',maxCount: 1},
	{name:'images' , maxCount: 5}
]);
// upload.single('image')
// upload.array('images',5)
exports.resizeProductImages = (req,res,next) => {

	next();
}

// exports.resizeProductPhoto = (req,res,next) => {// to be replaced
// 	if(!req.file) return next();

// 	req.file.filename = `${file.fieldname + '-' +Date.now() + path.extname(file.originalname)}.jpeg`;

// 	sharp(req.file.buffer)
// 	.resize(200,200)
// 	.toFormat('jpeg')
// 	.jpeg({quality:90})
// 	.toFile(`${__dirname}`+dest+`${req.file.filename}`);

// 	next();
// }

/////////////////////////////////////////////////////////////////////////////
/********************              CREATE             **********************/
/////////////////////////////////////////////////////////////////////////////

// Creating a new product in the database
exports.createProduct = async (req, res) => {
	console.log(req.body);
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
				product: newProduct
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};

/////////////////////////////////////////////////////////////////////////////
/********************               Read              **********************/
/////////////////////////////////////////////////////////////////////////////

// Read all the document in product collection
exports.getAllProducts = async (req, res) => {
	try {
		// // Creating a object that contain all the key value pairs of query parameters
		// const queryObject = { ...req.query };

		// // Creating a arry of keys should be ignored in the filtering
		// const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// // Delete the excluded fields from the query object
		// excludeFields.forEach(el => delete queryObject[el]);

		// Build the query
		const query = Product.find(req.query);

		// Execute the query
		const products = await query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: products.length,
			data: {
				products
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
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
				product
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
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
				product
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
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
			data: null
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message
		});
	}
};
