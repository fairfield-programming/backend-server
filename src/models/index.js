// Import Sequelize
const { Sequelize, Model, DataTypes, Op } = require('sequelize')

// Setup Global Operator
global.Op = Op;

// Define Sequelize Server
var sequelize;
sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Import Models
const Article = require('./Article')
const User = require('./User')
const Events = require('./Events')

// Define Models
global.Article = Article(sequelize, DataTypes);
global.User = User(sequelize, DataTypes);
global.Events = Events(sequelize, DataTypes);

// Setup Relationships
global.User.belongsToMany(global.Events, { through : 'EventSubscribers'})
global.Events.belongsToMany(global.User, { through : 'EventSubscribers'})

// Sync Sequelize
sequelize.sync();