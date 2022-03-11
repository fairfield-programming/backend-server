require('dotenv').config();

// Configure Imports
const express = require('express');
const { verify } = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const models = require('./models');
const cookieParser = require("cookie-parser");

// Configure Local Variables
const app = express();
const port = process.env.PORT || 8080;

// Configure Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());





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
app.get('/article/create', verifyLogin, require('./routes/Article/createArticle'));
app.get('/article/:id/', verifyLogin, require('./routes/Article/queryArticle'));
app.get('/article/', verifyLogin, require('./routes/Article/listArticles'));

// User Endpoints
app.get('/user/:id/', verifyLogin, require('./routes/User/queryUser'));
app.get('/user/:id/status', verifyLogin, require('./routes/User/Account/getStatus'));
app.get('/user', verifyLogin, require('./routes/User/listUsers'));

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
app.get('/event', verifyLogin, require('./routes/Events/listEvents'));
app.get('/event/:id/', verifyLogin, require('./routes/Events/queryEvent'));

app.post('/event/create', verifyLogin, verifyEmail, require('./routes/Events/createEvent'));
app.post('/event/:id/delete', verifyLogin, verifyEmail, require('./routes/Events/deleteEvent'));
app.post('/event/:id/edit', verifyLogin, verifyEmail, require('./routes/Events/editEvent'));
app.post('/event/:id/rsvp', verifyLogin, verifyEmail, require('./routes/Events/rsvpEvent'));
app.post('/event/:id/unrsvp', verifyLogin, verifyEmail, require('./routes/Events/unrsvpEvent'));


// email verification end point
app.get("/confirmEmail/:token", require("./routes/User/Account/confirmEmail"));





// Sync the Database
sequelize.sync().then(() => { app.emit('database-started'); });

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // Log Server Port to the Console.
    console.log(`Server Listening at http://localhost:${port}`);
  });
}

module.exports = app;
