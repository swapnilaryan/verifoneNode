const mockProducts = require("./products.mock");
const db = require("../app/models");
const Product = db.product;

const fillProducts = (db) => {
  db.mongoose.connection.db.listCollections().toArray((err, collections) => {
    const productCollection = collections.find((item) => {
      return item.name === "products";
    });
    if(!productCollection) {
      Product.insertMany(mockProducts).then(() => {
        console.log("Mock Products added successfully");
      }).catch(function(error){
        console.error("Error in inserting mock products ", error);
      });
    }
  })
}

module.exports = fillProducts;