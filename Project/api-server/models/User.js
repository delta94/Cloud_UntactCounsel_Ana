module.exports = function (sequelize, Datatypes) {
  var User = sequelize.define("User", {
    username: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    rank: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    socket: {
      type: Datatypes.INTEGER,
      allowNull: true,
      defaultValue: -1,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.User_config, {
      foreignKey: {
        name: "user_id",
        onDelete: "cascade",
      },
    });
    User.hasMany(models.User_info, {
      foreignKey: {
        name: "user_id",
        onDelete: "cascade",
      },
    });
  };

  return User;
};
