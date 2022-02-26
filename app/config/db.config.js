const test = {

}

const prod = {

}

const dev = {

}

const connection = {
  test: {
    HOST: "localhost",
    PORT: 27017,
    DB: "verifone_db_test"
  },
  prod: {
    HOST: "localhost",
    PORT: 27017,
    DB: "verifone_db"
  },
  dev: {
    HOST: "localhost",
    PORT: 27017,
    DB: "verifone_db"
  }
}

module.exports = function (env = "dev") {
  return connection[env]
};