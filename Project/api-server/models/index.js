"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("../config/config");
var sequelize = new Sequelize(
  config.DATABASE.database,
  config.DATABASE.user,
  config.DATABASE.password,
  {
    host: config.DATABASE.host,
    dialect: config.DATABASE.dialect,
    timezone: config.DATABASE.timezone,
  }
);

var db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
