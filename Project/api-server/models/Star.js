module.exports = function (sequelize, Datatypes) {
  var Star = sequelize.define("Star", {
    manager: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    grade: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
  });

  return Star;
};
