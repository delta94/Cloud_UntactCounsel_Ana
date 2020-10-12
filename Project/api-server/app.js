/*Modules */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var compression = require("compression");
var helmet = require("helmet");
// var cors = require("cors"); yarn add cors

/* Config */
var config = require("../config/config");
// var mainSequelize = require("./models/index");

var app = express();

/* Load Modules*/
app.use(compression());
app.use(helmet());
// app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// mainSequelize.sequelize
//   .sync()
//   .then(() => {
//     console.log("DB Connected!");
//   })
//   .catch((err) => {
//     console.log("DB Error : ", err);
//   });

/* Router */
var routes = require("./routes/routes");
routes(app);

module.exports = app;
