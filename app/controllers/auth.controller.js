const appConfig = require("../../app.config");
const authConfig = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, appConfig.BCRYPT_SALT),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ error: true, message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};

const signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ error: true, message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({  error: true, message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({  error: true, message: "Invalid Password!" });
      }
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: appConfig.JWT_EXPIRY,
      });
      req.session.token = token;
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};

const signOut = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

module.exports = {
  signUp,
  signOut,
  signIn
}