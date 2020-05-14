const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Creating a schema of a user to create mongoose model
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "Please enter the user's name!"],
	},
	email: {
		type: String,
		trim: true,
		required: [true, "Please enter the user's email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Please provide a password'],
		minlength: [8, 'Password must include at least 8 characters'],
		select: false,
	},
	passwordConfirm: {
		type: String,
		trim: true,
		required: [true, 'Please enter confirmation of your password'],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'Passwords are not the same!',
		},
	},
	address: {
		type: String,
		trim: true,
	},
	role: {
		type: String,
		trim: true,
		enum: ['customer', 'store-manager', 'admin'],
		default: 'customer',
	},
	image: {
		type: String,
		trim: true,
		default: 'defaultAvatar.jpg', //need attention
	},
	passwordChangedAt: Date,
});

// Encryption of the password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// Instance method to compare given password with user password
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to identify password changing
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
