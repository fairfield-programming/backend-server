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

const Article = require('./Article');
const User = require('./User');
const Event = require('./Event');

// Define Models
global.Article = Article(sequelize, DataTypes);
global.User = User(sequelize, DataTypes);
global.Event = Event(sequelize, DataTypes);


// Setup Relationships

// Relationship for Events

global.User.belongsToMany(global.Event, {
	through: 'EventSubscribers',
});
global.Event.belongsToMany(global.User, {
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
