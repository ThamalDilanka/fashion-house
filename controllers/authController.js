const { promisify } = require('util');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const randomColor = require('randomcolor');

const signToken = (user) => {
	return jwt.sign(
		{
			_id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXP_IN,
		}
	);
};

// Register a new user
exports.signup = async (req, res, next) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
			role: req.body.role,
			image: `https://ui-avatars.com/api/?name=${req.body.name.replace(
				/ /g,
				'+'
			)}L&background=${randomColor().replace(/#/g, '')}&color=fff`,
		});

		// Creating a token
		const token = signToken(newUser);

		// Remove password from the response
		newUser.password = undefined;

		res.status(201).json({
			status: 'success',
			token,
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log(email + ' ' + password);

		if (!email || !password) {
			throw new Error('Please provide email and password');
		}

		// Checking is user exists with email
		const user = await User.findOne({ email }).select('+password');

		// Check the user name and the password
		if (!user || !(await user.correctPassword(password, user.password))) {
			throw new Error('Incorrect email or password');
		}

		const token = signToken(user);

		res.status(201).json({
			status: 'success',
			data: {
				token,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.protect = async (req, res, next) => {
	try {
		let token;

		// Check the token is exists in the header
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			throw new Error('You are not logged in. Please Logged in');
		}

		// Verify the token
		try {
			// Decode the token and if it is invalid, twt will throw an error
			const decoded = await promisify(jwt.verify)(
				token,
				process.env.JWT_SECRET
			);

			// Check the user still exists
			const currentUser = await User.findById(decoded._id);
			if (!currentUser) {
				throw new Error('User no longer exists');
			}

			// Check if user changed password after the token issued
			if (currentUser.changedPasswordAfter(decoded.iat)) {
				throw new Element(
					'User has changed password. Please login again.'
				);
			}

			// Grant access to next middleware
			next();
		} catch (err) {
			// Handle the custom exceptions
			if (err.name === 'JsonWebTokenError') {
				res.status(401).json({
					status: 'failed',
					message: 'Invalid Token',
				});
			}

			if (err.name === 'TokenExpiredError') {
				res.status(401).json({
					status: 'failed',
					message: 'Token has expired',
				});
			} else {
				res.status(401).json({
					status: 'failed',
					message: err.message,
				});
			}

			// terminate the function
			return;
		}
	} catch (err) {
		res.status(401).json({
			status: 'failed',
			message: err.message,
		});
	}
};
