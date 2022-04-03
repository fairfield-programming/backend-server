require('dotenv').config();

// Configure Imports
const express = require('express');
const { Sequelize } = require('sequelize');
const models = require('./models');
const schedule = require('node-schedule');
const { removeUnconfirmedAccounts } = require('./jobs/accountCleanup');

// Configure Local Variables
const app = express();
const port = process.env.PORT || 8080;

// Configure Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cors')({ origin: 'https://fairfieldprogramming.org' }));

// Programs
app.get('/', require('./routes/index'));

// Duck Joke Endpoints
app.use('/jokes', require('./routes/jokeRoutes'));
// Duck Endpoints
app.use('/duck', require('./routes/duckRoutes'));

// Article Endpoints
app.use('/article', require('./routes/articleRoutes'));

// Event Endpoints
app.use('/event', require('./routes/eventRoutes'));

// User Endpoints
app.use('/user', require('./routes/userRoutes'));

// Sync the Database
(async () => {
	// await the database creation process, so as we can access the data on our jobs
	await sequelize.sync();
	app.emit('database-started');
})();

// run every 7 days
schedule.scheduleJob('remove unconfirmed accounts', '0 0 * * 0', () => {
	removeUnconfirmedAccounts();
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`);
	});
}

module.exports = app;
