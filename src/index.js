require('dotenv').config();

// Configure Imports
const express = require('express');
const { verify } = require('jsonwebtoken');
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


/**
 *  Verfies if the user has a confimed email address, otherwise send an error message
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middelware} next calls the next middelware
 * @returns {Response}
 */

const verifyEmail = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ where: { id: req.user.id } });
    if (currentUser && !currentUser.confirmed_email)
      return res.status(401).send("Please Confirm Your Email Address By Clicking On the Link Sent To Your MailBox")
    next();
  } catch (err) {
    res.send(err.message);
  }
}

/**
 *  Verfies if the user is logged in, otherwise redirect to "/login"
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middelware} next calls the next middelware
 * @returns {Response}
 */

const verifyLogin = (req, res, next) => {
  if (req.cookies.token) {
    verify(req.cookies.token, process.env.JWT_KEY, (err, userData) => {
      if (err) return res.status(400).send(err.message);
      req.user = userData;
      next();
    })
  }
  else res.redirect("/login");
}


// Programs
app.get('/', require('./routes/index'))

// Duck Joke Endpoints
app.get('/joke', require('./routes/Joke/random'));
app.get('/jokes', require('./routes/Joke/all'));
app.get('/jokes/count', require('./routes/Joke/count'));
app.get('/jokes/random', require('./routes/Joke/random'));
app.get('/jokes/:id', require('./routes/Joke/id'));

// Duck Endpoints
app.get('/duck', require('./routes/Duck/index'));
app.get('/duck/:id', require('./routes/Duck/id'));
app.get('/duck/:id/:zoom', require('./routes/Duck/idZoom'));

// Article Endpoints
app.get('/article/create', require('./routes/Article/createArticle'));
app.get('/article/:id/', require('./routes/Article/queryArticle'));
app.get('/article/', require('./routes/Article/listArticles'));

// User Endpoints
app.get('/user/count', require('./routes/User/countUsers'));
app.get('/user/:id/', require('./routes/User/queryUser'));
app.get('/user/:id/status', require('./routes/User/Account/getStatus'));
app.get('/user', require('./routes/User/listUsers'));

app.post('/user/signup', require('./routes/User/Account/signup'));
app.post('/user/login', require('./routes/User/Account/login'));
app.post('/user/:id/update', verifyLogin, require('./routes/User/Account/setData'));
app.post('/user/:id/status', verifyLogin, require('./routes/User/Account/setStatus'));
app.post('/user/:id/password', verifyLogin, require('./routes/User/Account/setPass'));
app.post('/user/:id/delete', verifyLogin, require('./routes/User/Account/deleteAccount'));

// Block Endpoints
app.get('/user/:id/block', verifyLogin, require('./routes/User/Block/listBlocked'))
app.get('/user/:id/block/:blockId/query', verifyLogin, require('./routes/User/Block/queryBlock.js'))

app.post('/user/:id/block/:blockId/block', verifyLogin, verifyEmail, require('./routes/User/Block/blockUser'));
app.post('/user/:id/block/:blockId/undo', verifyLogin, verifyEmail, require('./routes/User/Block/unblockUser'));

// Follow Endpoints
app.get('/user/:id/followers', verifyLogin, require('./routes/User/Followers/listFollowers'));
app.get('/user/:id/followers/:followerId', verifyLogin, require('./routes/User/Followers/queryFollower'));

app.post('/user/:id/followers/:followerId/follow', verifyLogin, verifyEmail, require('./routes/User/Followers/followUser'));
app.post('/user/:id/followers/:followerId/undo', verifyLogin, verifyEmail, require('./routes/User/Followers/unfollowUser'));

// Event Endpoints
app.get('/event', require('./routes/Events/listEvents'));
app.get('/event/:id/', require('./routes/Events/queryEvent'));

app.post('/event/create', verifyLogin, verifyEmail, require('./routes/Events/createEvent'));
app.post('/event/:id/delete', verifyLogin, verifyEmail, require('./routes/Events/deleteEvent'));
app.post('/event/:id/edit', verifyLogin, verifyEmail, require('./routes/Events/editEvent'));
app.post('/event/:id/rsvp', verifyLogin, verifyEmail, require('./routes/Events/rsvpEvent'));
app.post('/event/:id/unrsvp', verifyLogin, verifyEmail, require('./routes/Events/unrsvpEvent'));


// email verification end point
app.get("/confirmEmail/:token", require("./routes/User/Account/confirmEmail"));





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
