const db = require("../models");
const Product = db.product;

const getAllProducts = (req, res) => {
  Product.find().exec((err, products) => {
    if(err) {
      res.status(500).send({message: "error occurred in fetching products API"})
      return;
    }
    res.status(200).send(products);
  })
}
module.exports = {
  getAllProducts
}