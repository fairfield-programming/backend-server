// Import Sequelize
const { Sequelize, DataTypes, Op } = require('sequelize');

// Setup Global Operator
global.Op = Op;

// Define Sequelize Server
let sequelize;
let env = process.env.NODE_ENV || 'development';

// Second Check
if (!process.env.DATABASE_URL) env = 'development';

if (env === 'development') {
	sequelize = new Sequelize('sqlite::memory:', {
		logging: console.log,
	});
} else {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		logging: false,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	});
}

// Import Models

const ArticleModel = require('./Article');
const UserModel = require('./User');
const EventsModel = require('./Events');

// Define Models
const Article = ArticleModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Events = EventsModel(sequelize, DataTypes);

// Setup Relationships

// Relationship for Events
User.belongsToMany(Events, {
	through: 'EventSubscribers',
});
Events.belongsToMany(User, {
	through: 'EventSubscribers',
});

// Relationship for Follower System
User.belongsToMany(User, {
	through: 'Followers',
	as: 'Followee',
	foreignKey: 'followeeId',
});
User.belongsToMany(User, {
	through: 'Followers',
	as: 'Follower',
	foreignKey: 'followerId',
});

// Relationship for Block System
User.belongsToMany(User, {
	through: 'Blocked',
	as: 'Blocker',
	foreignKey: 'blockerId',
});
User.belongsToMany(User, {
	through: 'Blocked',
	as: 'BlockedUser',
	foreignKey: 'blockedId',
});

global.sequelize = sequelize;
module.exports = {
	sequelize,
	Article,
	User,
	Events,
	Op,
};
