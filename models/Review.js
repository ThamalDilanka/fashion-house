const mongoose = require("mongoose");

// Creating a schema of a review to create mongoose model
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A review must belongs to a User."],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "A review must belongs to a specific product."],
  },
  comment: {
    type: String,
    trim: true,
    required: [true, "A review must need a comment."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "A review must need a rating."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/**
 * Creating mongoose model and export. First argument, 'review' is the
 * collection name in the database.
 */
const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
