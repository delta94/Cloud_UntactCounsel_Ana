module.exports = function (sequelize, Datatypes) {
  var Chat_list = sequelize.define("Chat_list", {
    message: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    author: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    isRead: {
      type: Datatypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Chat_list;
};
