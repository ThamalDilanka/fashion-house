const mongoose = require("mongoose");

// Creating a schema of an order to create mongoose model
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A favourite item must belongs to a User."],
  },
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Please enter Product ID."],
        },
        color: {
          type: String,
          trim: true,
          required: [true, "Please enter color."],
        },
        size: {
          type: String,
          required: [true, "Please enter size."],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter quantity."],
        },
      },
    ],
    required: [true, "Please enter atleast one product."],
  },
  totalAmount: {
    type: Number,
    required: [true, "Please enter the total amount."],
  },
  discountAmount: {
    type: Number,
    required: [true, "Please enter a discount amount."],
  },
  paymentMethod: {
    type: String,
    required: [true, "Please enter a payment method."],
    enum: ["Visa", "Master", "Cash-On-Delivery"],
    default: "customer",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/**
 * Creating mongoose model and export. First argument, 'order' is the
 * collection name in the database.
 */
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
