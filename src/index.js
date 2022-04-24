require('dotenv').config();

// Configure Imports
const express = require('express');
const schedule = require('node-schedule');
<<<<<<< HEAD
const { remove_unconfirmed_email_users, email_confirmation_reminder} = require("./background_jobs/unconfirmed_emails");
=======
const { removeUnconfirmedAccounts } = require('./jobs/accountCleanup');
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5

// Configure Local Variables
const app = express();
const port = process.env.PORT || 8080;

// Configure Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
<<<<<<< HEAD
app.use(require("cors")({
    origin: ['https://fairfieldprogramming.org', 'http://localhost:8000/']
}));


=======
app.use(require('cors')({ origin: 'https://fairfieldprogramming.org' }));
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5

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

<<<<<<< HEAD
  // this will run the job at the 10th day of each month at 08:00;
  schedule.scheduleJob(
    "remind users to confirm their email address",
    "0 8 10 * *", 
    () => {
      email_confirmation_reminder();
    },
  )

  // this will run the job at the 28th day of each month at 00:00;
  schedule.scheduleJob(
    "remove user accounts with unconfirmed email addresses",
    "0 0 28 * *", 
    () => {
      remove_unconfirmed_email_users();
    },
  )
})()
=======
// run every 7 days
schedule.scheduleJob('remove unconfirmed accounts', '0 0 * * 0', () => {
	removeUnconfirmedAccounts();
});
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5

// Start Server
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`);
	});
}

module.exports = app;
