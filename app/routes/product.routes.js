const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");
module.exports = function(app) {
  app.get(
    "/api/getAllProducts",
    [
      authJwt.verifyToken,
    ],
    controller.getAllProducts
  );
};