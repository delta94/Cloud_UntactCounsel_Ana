module.exports = function (sequelize, Datatypes) {
  var Chat = sequelize.define("Chat", {
    user: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    manager: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Chat.associate = function (models) {
    Chat.hasMany(models.Chat_list, {
      foreignKey: {
        name: "chat_id",
        onDelete: "cascade",
      },
    });
  };

  return Chat;
};
