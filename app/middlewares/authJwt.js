const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const verifyToken = (req, res, next) => {
  if(process.env.NODE_ENV === "test") {
    return true;
  }
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({  error: true, message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({  error: true, message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken
}