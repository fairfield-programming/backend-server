module.exports = (sequelize, DataTypes) => sequelize.define(
  "User",
  {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
    biography: DataTypes.TEXT,
    profilePicture: DataTypes.TEXT,
    status: DataTypes.STRING,
  },
);
