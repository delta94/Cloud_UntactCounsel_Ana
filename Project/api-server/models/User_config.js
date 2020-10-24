module.exports = function (sequelize, Datatypes) {
  var User_config = sequelize.define("User_config", {
    comment: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
  });

  User_config.associate = function (models) {
    User_config.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
      },
    });
  };

  return User_config;
};
