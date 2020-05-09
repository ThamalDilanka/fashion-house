const mongoose = require("mongoose");

// Creating a schema of a cart to create mongoose model
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A cart item must belongs to a User."],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "A cart item must belongs to a specific product."],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter a quantity."],
  },
  size: {
    type: String,
    trim: true,
    required: [true, "Please enter a size."],
  },
  color: {
    type: String,
    trim: true,
    required: [true, "Please enter a color."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/**
 * Creating mongoose model and export. First argument, 'cart' is the
 * collection name in the database.
 */
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
