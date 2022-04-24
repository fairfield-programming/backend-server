module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		username: DataTypes.STRING,
		password: DataTypes.TEXT,
		email: DataTypes.TEXT,
		biography: DataTypes.TEXT,
		profilePicture: DataTypes.TEXT,
		status: DataTypes.STRING,
		confirmed_email: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});
};
