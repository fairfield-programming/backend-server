require('dotenv').config();

// Configure Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
	dialect: 'sqlite',
});
const schedule = require('node-schedule');
const { removeUnconfirmedAccounts, emailConfirmationRemainder } = require('./jobs/accountCleanup');
const { eventRemainder } = require('./jobs/eventNotifications');

// Configure Local Variables
const app = express();
const port = process.env.PORT || 8080;

// Configure Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
	require('cors')({
		origin: '*',
	}),
);

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

	// this will run the job at the 10th day of each month at 08:00;
	schedule.scheduleJob('remind users to confirm their email address', '0 8 10 * *', () => {
		emailConfirmationRemainder();
	});

	// this will run the job at the 28th day of each month at 00:00;
	schedule.scheduleJob('remove user accounts with unconfirmed email addresses', '0 0 28 * *', () => {
		removeUnconfirmedAccounts();
	});
	schedule.scheduleJob('remaind users about the events they are subscribed to', '0 8 * * *', () => {
		eventRemainder();
	});
})();

// Start Server
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`);
	});
}

module.exports = app;
