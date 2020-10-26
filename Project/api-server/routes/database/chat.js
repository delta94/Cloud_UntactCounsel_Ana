const Models = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/* make chat */
exports.createChat = async (user, manager) => {
  let info = await Models.Chat.create({
    user,
    manager,
  });
  return [null, info.id];
};

/* private chat - CREATE Chat */
exports.doChat = async (id, message, author) => {
  let info = await Models.Chat_list.create({
    chat_id: id,
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
