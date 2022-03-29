require('dotenv').config();

// Configure Imports
const express = require('express');
const { Sequelize } = require('sequelize');
const models = require('./models');
const { remove_unconfirmed_email_users } = require("./background_jobs/unconfirmed_emails");

// Configure Local Variables
const app = express();
const port = process.env.PORT || 8080;

// Configure Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("cors")({ origin: "https://fairfieldprogramming.org" }));



// Programs
app.get('/', require('./routes/index'));

// Duck Joke Endpoints
app.use('/jokes', require('./routes/jokeRoutes'));
// Duck Endpoints
app.use('/duck', require('./routes/duckRoutes'));

// Article Endpoints
app.use('/article', require('./routes/articleRoutes'));


// Event Endpoints
app.use("/event", require("./routes/eventRoutes"));


// User Endpoints
app.use("/user", require("./routes/userRoutes"));



// Sync the Database
(async () => {
  // await the database creation process, so as we can access the data on our jobs
  await sequelize.sync().then(() => { app.emit('database-started'); });

  // execute the job once a while, 20 days in this example  
  // note that there is a limit for the interval since it is an integer
  setInterval(remove_unconfirmed_email_users, 20 * 24 * 60 * 60 * 1000)
})()

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // Log Server Port to the Console.
    console.log(`Server Listening at http://localhost:${port}`);
  });
}

module.exports = app;
