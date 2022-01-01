require('dotenv').config();

// Configure Imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const models = require('./models');

// Configure Local Variables
const app = express();
const port = process.env.PORT || 8080;
global.bcrypt = bcrypt;
global.jwt = jwt;

// Configure Middleware
app.use(express.static('public'));
app.use(express.json());

// Auth Middleware
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    next();
  }
});

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
app.get('/user/:id/', require('./routes/User/queryUser'));
app.get('/user/:id/status', require('./routes/User/Account/getStatus'));
app.get('/user/', require('./routes/User/listUsers'));
app.get(
  '/user/:id/followers',
  require('./routes/User/Followers/listFollowers')
);
app.get(
  '/user/:id/followers/:followerId',
  require('./routes/User/Followers/queryFollower')
);

app.post('/user/signup', require('./routes/User/Account/signup'));
app.post('/user/login', require('./routes/User/Account/login'));
app.post('/user/:id/update', require('./routes/User/Account/setData'));
app.post('/user/:id/status', require('./routes/User/Account/setStatus'));
app.post('/user/:id/password', require('./routes/User/Account/setPass'));
app.post('/user/:id/delete', require('./routes/User/Account/deleteAccount'));
app.post(
  '/user/:id/follow/:followerId',
  require('./routes/User/Followers/followUser')
);
app.post(
  '/user/:id/unfollow/:followerId',
  require('./routes/User/Followers/unfollowUser')
);
app.post(
  '/useruser/:id/block/:blockId',
  require('./routes/User/Block/blockUser')
);

// Event Endpoints
app.get('/event/', require('./routes/Events/listEvents'));
app.get('/event/:id/', require('./routes/Events/queryEvent'));

app.post('/event/create', require('./routes/Events/createEvent'));
app.post('/event/:id/delete', require('./routes/Events/deleteEvent'));
app.post('/event/:id/edit', require('./routes/Events/editEvent'));
app.post('/event/:id/rsvp', require('./routes/Events/rsvpEvent'));
app.post('/event/:id/unrsvp', require('./routes/Events/unrsvpEvent'));

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