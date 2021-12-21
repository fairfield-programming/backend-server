require('dotenv').config()

// Configure Imports
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')
const models = require('./models') 

// Configure Local Variables
var app = express();
var port = process.env.PORT || 8080;
global.bcrypt = bcrypt;
global.jwt = jwt; 

// Configure Middleware
app.use(express.static("public"));
app.use(express.json());

// Article Endpoints
app.get("/article/create", require('./routes/Article/createArticle'));
app.get("/article/:id/", require('./routes/Article/queryArticle'));
app.get("/article/", require('./routes/Article/listArticles'));

// User Endpoints
app.get("/user/signup", require('./routes/User/signup'));
app.get("/user/login", require('./routes/User/login'));
app.get("/user/:id/", require('./routes/User/queryUser'));
app.get("/user/", require('./routes/User/listUsers'));

// Start Server
app.listen(port, function () {

	// Log Server Port to the Console.
	// console.log("Server Listening at http://localhost:" + port);

})