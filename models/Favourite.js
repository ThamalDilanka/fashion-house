const mongoose = require("mongoose");

// Creating a schema of a favourite to create mongoose model
const favouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A favourite item must belongs to a User."],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "A favourite item must belongs to a specific product."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/**
 * Creating mongoose model and export. First argument, 'favourite' is the
 * collection name in the database.
 */
const Favourite = mongoose.model("favourite", favouriteSchema);
module.exports = Favourite;
