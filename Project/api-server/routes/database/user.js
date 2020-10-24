const Models = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");
const config = require("../../config/config");

/* Sign up */
exports.createUser = async (username, password) => {
  let callback = [true, 0];
  try {
    let info = await Models.User.create({
      username: username,
      rank: 1,
    });
    await Models.User_info.create({
      user_id: info.id,
      password: password,
    });
    let token = jwt.sign(info.get(), config.JWT_SECRET);
    callback = [null, token, 1];
  } catch (err) {
    console.log(err);
    callback = [true, "존재하는 아이디"];
  }
  return callback;
};

/* Login */
exports.loginUser = async (username, password) => {
  let callback = [true, 0];
  let info = await Models.User.findOne({ where: { [Op.and]: [{ username }] } });
  if (info) {
    /* valid username */
    let user = await Models.User_info.findOne({
      where: { user_id: info.id },
    });
    if (user.validPassword(password, user.password)) {
      /* valid password */
      console.log(info.get())
      let token = jwt.sign(info.get(), config.JWT_SECRET);
      callback = [null, token, info.rank];
    } else {
      callback = [true, "틀린 비밀번호"];
    }
  } else {
    callback = [true, "없는 아이디"];
  }

  return callback;
};

exports.checkRoom = async (id) => {
  let callback = [true, 0];
  let info = await Models.User.findOne({ where: { id } });
  if (info) callback = [null, info.room];
  return callback;
};
