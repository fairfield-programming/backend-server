module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Post', {
		title: DataTypes.STRING,
		content: DataTypes.TEXT,
		ownerId: DataTypes.INTEGER,
	});
};
