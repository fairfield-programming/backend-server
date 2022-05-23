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
const Events = require('./Events');

// Define Models
global.Article = Article(sequelize, DataTypes);
global.User = User(sequelize, DataTypes);
global.Events = Events(sequelize, DataTypes);

// Setup Relationships

// Relationship for Events
global.User.belongsToMany(global.Events, {
	through: 'EventSubscribers',
});
global.Events.belongsToMany(global.User, {
	through: 'EventSubscribers',
});

// Relationship for Follower System
global.User.belongsToMany(global.User, {
	through: 'Followers',
	as: 'Followee',
	foreignKey: 'followeeId',
});
global.User.belongsToMany(global.User, {
	through: 'Followers',
	as: 'Follower',
	foreignKey: 'followerId',
});

// Relationship for Block System
global.User.belongsToMany(global.User, {
	through: 'Blocked',
	as: 'Blocker',
	foreignKey: 'blockerId',
});
global.User.belongsToMany(global.User, {
	through: 'Blocked',
	as: 'BlockedUser',
	foreignKey: 'blockedId',
});



global.sequelize = sequelize;
