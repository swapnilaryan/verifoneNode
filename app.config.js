const COOKIE_SECRET = "verifone_secret";
const AUTH_SECRET = "verifone_auth_secret";
const JWT_EXPIRY = 600; // 10 secs
const BCRYPT_SALT = 8;

module.exports = {
  BCRYPT_SALT,
  COOKIE_SECRET,
  AUTH_SECRET,
  JWT_EXPIRY
}