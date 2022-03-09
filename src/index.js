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


// Auth Middleware
// this middelware should stop the users that :
// - do not have tokens
// - do not have a confirmed email.
const authMiddelware = (req, res, next) => {
  if (req.cookies.token) {
    verify(req.cookies.token, process.env.JWT_KEY, async (err, userData) => {
      if (err) return res.status(400).send(err.message);

      const activ_user = await User.findOne({ where: { id: userData.id } });

      if (activ_user  && !activ_user.confirmed_email)
        return res.status(401).send("please confirm your email address to continue !");

      req.user = userData;
      next();
    })
  }
  else res.redirect("/login");
}


// Programs
// app.get('/', require('./routes/index'))

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
app.get('/user',authMiddelware, require('./routes/User/listUsers'));

app.post('/user/signup', require('./routes/User/Account/signup'));
app.post('/user/login', require('./routes/User/Account/login'));
app.post('/user/:id/update', require('./routes/User/Account/setData'));
app.post('/user/:id/status', require('./routes/User/Account/setStatus'));
app.post('/user/:id/password', require('./routes/User/Account/setPass'));
app.post('/user/:id/delete', require('./routes/User/Account/deleteAccount'));

// Block Endpoints
app.get('/user/:id/block', require('./routes/User/Block/listBlocked'))
app.get('/user/:id/block/:blockId/query', require('./routes/User/Block/queryBlock.js'))

app.post('/user/:id/block/:blockId/block', require('./routes/User/Block/blockUser'));
app.post('/user/:id/block/:blockId/undo', require('./routes/User/Block/unblockUser'));

// Follow Endpoints
app.get('/user/:id/followers', require('./routes/User/Followers/listFollowers'));
app.get('/user/:id/followers/:followerId', require('./routes/User/Followers/queryFollower'));

app.post('/user/:id/followers/:followerId/follow', require('./routes/User/Followers/followUser'));
app.post('/user/:id/followers/:followerId/undo', require('./routes/User/Followers/unfollowUser'));

// Event Endpoints
app.get('/event', require('./routes/Events/listEvents'));
app.get('/event/:id/', require('./routes/Events/queryEvent'));

app.post('/event/create', require('./routes/Events/createEvent'));
app.post('/event/:id/delete', require('./routes/Events/deleteEvent'));
app.post('/event/:id/edit', require('./routes/Events/editEvent'));
app.post('/event/:id/rsvp', require('./routes/Events/rsvpEvent'));
app.post('/event/:id/unrsvp', require('./routes/Events/unrsvpEvent'));


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
