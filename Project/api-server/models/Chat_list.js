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

  // Chat_list.associate = function (models) {
  //   Chat_list.belongsTo(models.Chat, {
  //     foreignKey: {
  //       name: "chat_id",
  //     },
  //   });
  // };

  return Chat_list;
};
