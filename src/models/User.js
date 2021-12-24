module.exports = function (sequelize, DataTypes) {

	return sequelize.define('User', {
		username: DataTypes.STRING,
		password: DataTypes.TEXT,
		email: DataTypes.TEXT,
		biography: DataTypes.TEXT,
		profilePicture: DataTypes.TEXT,
		status: DataTypes.STRING,
	})

};