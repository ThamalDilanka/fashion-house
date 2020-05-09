const mongoose = require("mongoose");
const validator = require("validator");

// Creating a schema of a user to create mongoose model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please eneter the user's name!"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please eneter the user's email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must include at least 10 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, "Please enter confirmation of your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  address: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true,
    enum: ["customer", "store-manager", "admin"],
    default: "customer",
  },
  image: {
    type: String,
    trim: true,
    default: "defaultAvatar.jpg", //need attention
  },
});

/**
 * Creating mongoose model and export. First argument, 'user' is the
 * collection name in the database.
 */
const User = mongoose.model("user", userSchema);
module.exports = User;
