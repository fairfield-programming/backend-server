module.exports = function (sequelize, DataTypes) {
  return sequelize.define("Article", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    body: DataTypes.TEXT,
  });
};
