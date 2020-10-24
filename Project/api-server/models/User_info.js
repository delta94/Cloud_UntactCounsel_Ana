const bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, Datatypes) {
  var User_info = sequelize.define(
    "User_info",
    {
      password: {
        type: Datatypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          {
            user.password = bcrypt.hashSync(
              user.password,
              bcrypt.genSaltSync(10),
              null
            );
          }
        },
      },
      instanceMethods: {
        validPassword: function (password) {
          console.log(this); //why no work??
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );

  /* temp forced method */
  User_info.prototype.validPassword = (password, hashedpassword) =>
    bcrypt.compareSync(password, hashedpassword);

  // User_info.associate = function (models) {
  //   User_info.belongsTo(models.User, {
  //     foreignKey: {
  //       name: "id",
  //     },
  //   });
  // };

  return User_info;
};
