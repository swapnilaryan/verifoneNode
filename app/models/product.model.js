const mongoose = require("mongoose");
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    image: String
  }, { versionKey: false })
);
module.exports = Product;