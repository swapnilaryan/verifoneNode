const dbConfig = require("./app/config/db.config")(process.env.NODE_ENV);
const config = require("./app.config");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const fillProducts = require("./mock/fillProducts");
const fillUsers = require("./mock/fillUsers");
const path = require("path");

const db = require("./app/models");

// if(process.env.NODE_ENV === "test") {
//   console.log = () => {};
// }

console.log(process.env)

const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "verfione-session",
    secret: config.COOKIE_SECRET,
    httpOnly: true
  })
);
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

// simple route
app.get("/healthCheck", (req, res) => {
  res.json({ message: "Welcome to verifone application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/product.routes')(app);
let server = app;
console.log("Mongo", `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
db.mongoose
 .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => {
    fillUsers(db);
    fillProducts(db);
    console.log("Successfully connect to MongoDB.");
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "build/static")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname,  "build", "index.html"));
});

module.exports = server
