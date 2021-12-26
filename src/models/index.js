// Import Sequelize
const { Sequelize, Model, DataTypes, Op } = require('sequelize')

// Setup Global Operator
global.Op = Op;

// Define Sequelize Server
var sequelize;
sequelize = new Sequelize({
    "dialect": "sqlite",
    "logging": false,
    "storage": "./database.db"
});

// Import Models
const Article = require('./Article')
const User = require('./User')
const Events = require('./Events')

// Setup Relationships
User.belongsToMany(Events, { through : 'UserEvents'})
Events.belongsToMany(User, { through : 'UserEvents'})

// Define Models
global.Article = Article(sequelize, DataTypes);
global.User = User(sequelize, DataTypes);
global.Events = Events(sequelize, DataTypes);

// Sync Sequelize
sequelize.sync();