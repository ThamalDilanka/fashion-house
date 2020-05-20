const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require("fs");

const googleCloud = new Storage({
	keyFilename: path.join(
		__dirname,
		'../festive-nova-277809-09edc17f9ed8.json'
	),
	projectId: 'festive-nova-277809',
});

const imageBucket = googleCloud.bucket('fashion_house');

exports.uploadToBucket = (req, res, next) => {
	const file = path.join(__dirname, `../images/${req.fileName}`);

	imageBucket
		.upload(file, {
			resumable: false,
			gzip: true,
		})
		.then(() => {

			res.status(201).json({
				status: 'success',
				data: {
                    message: 'Image uploaded successfully to the cloud',
					fileName: req.fileName,
					url: `https://storage.googleapis.com/fashion_house/${req.fileName}`,
				},
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: 'failed',
				message: err.message,
			});
		});
};
