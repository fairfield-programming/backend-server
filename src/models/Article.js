module.exports = (sequelize, DataTypes) => sequelize.define(
  'Article',
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    body: DataTypes.TEXT,
  },
);
