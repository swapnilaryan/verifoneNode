const mockProducts = require("./products.mock");
const db = require("../app/models");
const Product = db.product;

const fillProducts = () => {
  Product.find().exec((err, products) => {
    if(err) {
      return;
    }
    !products.length &&
    Product.insertMany(mockProducts).then(() => {
      console.log("Mock Products added successfully");
    }).catch(function(error){
      console.error("Error in inserting mock products ", error);
    });
  });
}

module.exports = fillProducts;