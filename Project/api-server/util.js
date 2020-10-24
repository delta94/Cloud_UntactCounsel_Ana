/* Json Web Token */
var config = require("../config/config");
var jwt = require("jsonwebtoken");

exports.encryption = async (value, callback) => {
  console.log("encryp in jwt.js");
  jwt.sign(
    value,
    config.SESSION_SECRET,
    { expiresIn: 60 * 60 * 60 },
    (err, token) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        return callback(null, token);
      }
    }
  );
};

exports.decryption = async (token, callback) => {
  let(err, value) = await jwt.verify(token, config.SESSION_SECRET);
};
