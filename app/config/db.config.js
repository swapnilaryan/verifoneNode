const connection = {
  docker: {
    HOST: "mongodb",
    PORT: 27017,
    DB: "verifone_db"
  },
  dev: {
    HOST: "localhost",
    PORT: 27017,
    DB: "verifone_db"
  },
  test: {
    HOST: "localhost",
    PORT: 27017,
    DB: "verifone_db"
  }
}

module.exports = function (env = "dev") {
  return connection[env]
};