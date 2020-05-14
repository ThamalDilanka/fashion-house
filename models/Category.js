const mongoose = require("mongoose");

// Creating a schema of a category to create mongoose model
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter a title for the category"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter a description."],
  },
  images: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    required: [true, "Please upload a image"],
  }
});

/**
 * Creating mongoose model and export. First argument, 'category' is the
 * collection name in the database.
 */
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
