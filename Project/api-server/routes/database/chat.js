const Models = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/* make chat */
exports.createChat = async (user, manager) => {
  let info = await Models.Chat.create({
    user,
    manager,
  });
  await Models.User.update({ room: info.id }, { where: { id: user } });
  await Models.User.update({ room: info.id }, { where: { id: manager } });
  return [null, info.id];
};

/* destory chat */
exports.destoryChat = async (user, manager) => {
  await Models.User.update({ room: -1 }, { where: { id: user } });
  await Models.User.update({ room: -1 }, { where: { id: manager } });
  return [null, 0];
};

/* private chat - CREATE Chat */
exports.doChat = async (id, message, author) => {
  let info = await Models.Chat_list.create({
    id,
    message,
    author,
  });
  return [null, info.id];
};

/* private room - SELECT * FROM Chat_list WHERE chat_id  */
exports.getChatAll = async (chat_id) => {
  let info = await Models.Chat_list.find({
    chat_id,
  });
  return [null, info.id];
};

/* private room list - SELECT * FROM Chat_list WHERE manager */
exports.getChatWho = async (manager) => {
  let info = await Models.Chat.find({
    manager,
  });
  return [null, info.id];
};
