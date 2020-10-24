const Models = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Chat = require("./chat");

/*  */
exports.queueIn = async (user_id, rank) => {
  let info = await Models.Queue.create({
    user_id,
    rank,
  });
  return [null, info.id];
};

/* */
exports.queueCheck = async () => {
  let user, manager;
  let info = await Chat.findOne({ where: { rank: 99 } });
  if (info) {
    manager = info.id;
    info = await Chat.findOne({ where: { rank: 1 } });
  }
  if (info) {
    user = info.id;
    return [null, [user, manager]];
  } else {
    return [true, "대기중..."];
  }
};

/*  */
exports.queueOut = async (user, manager) => {
  let info = await Models.Queue.destroy({
    where: { [Op.or]: [{ user_id: user }, { user_id: manager }] },
  });

  return [null, await Chat.createChat(user, manager).id];
};
