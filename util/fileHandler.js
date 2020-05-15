const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');

const multerStorage = multer.memoryStorage();

//multer filter - allow only image files to be uploaded
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(
			new AppError('Not an image! please upload only images!', 400),
			false
		);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([{ name: 'images', maxCount: 5 }]);

exports.resizeImages = async (req, res, next) => {
	// Check for the image and reqtype in the request
	if (!req.files.images) {
		return res.status(400).json({
			status: 'failed',
			message: 'please upload a image',
		});
	} else if (
		!req.body.reqtype ||
		!(
			req.body.reqtype === 'product' ||
			req.body.reqtype === 'category' ||
			req.body.reqtype === 'user'
		)
	) {
		return res.status(400).json({
			status: 'failed',
			message: 'please add a valid reqtype attribute to the body',
		});
	}

	// Resizing and Rename the image
	try {
		let directory, width, height, quality;

		// Setting values according to the reqtype
		if (req.body.reqtype === 'product') {
			directory = 'products';
			width = parseInt(process.env.PRODUCT_IMAGE_WIDTH);
			height = parseInt(process.env.PRODUCT_IMAGE_HEIGHT);
			quality = parseInt(process.env.PRODUCT_IMAGE_QUALITY);
		} else if (req.body.reqtype === 'category') {
			directory = 'categories';
			width = parseInt(process.env.CATEGORY_IMAGE_WIDTH);
			height = parseInt(process.env.CATEGORY_IMAGE_HEIGHT);
			quality = parseInt(process.env.CATEGORY_IMAGE_QUALITY);
		} else if (req.body.reqtype === 'user') {
			directory = 'users';
			width = parseInt(process.env.USER_IMAGE_WIDTH);
			height = parseInt(process.env.USER_IMAGE_HEIGHT);
			quality = parseInt(process.env.USER_IMAGE_QUALITY);
		}

		req.body.images = [];
		await Promise.all(
			req.files.images.map(async (file, i) => {
				const filename = `${uuid.v4()}-${Date.now()}.jpeg`;

				console.log(
					`${__dirname}${process.env.IMAGE_DESTINATION}${directory}/${filename}`
				);

				await sharp(file.buffer)
					.resize(width, height)
					.toFormat('jpeg')
					.jpeg({ quality: quality })
					.toFile(
						`${__dirname}${process.env.IMAGE_DESTINATION}${directory}/${filename}`
					);

				req.body.images.push(filename);
			})
		);
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
	next();
};
