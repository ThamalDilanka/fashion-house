const { promisify } = require('util');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const randomColor = require('randomcolor');
const email = require('../util/email');

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
        
        // Sending email to the store manger
        await email.sendEmail(
			'thamaldilanke@gmail.com',
			'Password Reset',
			`<h3>Forgot password?</h3><p>Submit a PATCH request with your new password and passwordConfirm to<a>${resetURL}</a>.<p>`
		);

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

		res.status(200).json({
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

			// Adding the verified user to the request
			req.user = currentUser;

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

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(403).json({
				status: 'failed',
				message: "You don't have permission to perform this action",
			});
		}

		next();
	};
};

exports.forgotPassword = async (req, res, next) => {
	let user;
	try {
		// Getting user based on the email
		user = await User.findOne({ email: req.body.email });
		if (!user) {
			throw new Error('There is no user with this email address');
		}
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: 'err.message',
		});
	}

	// Generate a random token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// Send it to user's email
	const resetURL = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/users/resetPassword/${resetToken}`;

	const message = `Forgot password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\n`;

	try {
		await email.sendEmail(
			'thamaldilanke@gmail.com',
			'Password Reset',
			`<h3>Forgot password?</h3><p>Submit a PATCH request with your new password and passwordConfirm to<a>${resetURL}</a>.<p>`
		);
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        res.status(500).json({
			status: 'failed',
			message: 'There was an error sending the email. Try again later!',
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			message: 'Token sent to the email',
		},
	});
};

exports.resetPassword = async (req, res, next) => {};
