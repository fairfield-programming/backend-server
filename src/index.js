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

// Duck Joke Endpoints
app.get("/joke", require('./routes/Joke/random')); 
app.get("/jokes", require('./routes/Joke/all'));
app.get("/jokes/count", require('./routes/Joke/count'));
app.get("/jokes/random", require('./routes/Joke/random'));
app.get("/jokes/:id", require('./routes/Joke/id'));

// Duck Endpoints
app.get("/duck", require('./routes/Duck/index'));
app.get("/duck/:id", require('./routes/Duck/id'));
app.get("/duck/:id/:zoom", require('./routes/Duck/idZoom'));

// Article Endpoints
app.get("/article/create", require('./routes/Article/createArticle'));
app.get("/article/:id/", require('./routes/Article/queryArticle'));
app.get("/article/", require('./routes/Article/listArticles'));
 
// User Endpoints
app.get("/user/:id/", require('./routes/User/queryUser'));
app.get("/user/:id/status", require('./routes/User/getStatus'));
app.get("/user/", require('./routes/User/listUsers'));

app.post("/user/signup", require('./routes/User/signup'));
app.post("/user/login", require('./routes/User/login'));
app.post("/user/:id/status", require('./routes/User/setStatus'));
app.post('/user/:id/setPass',require('./routes/User/setPass'));

// Start Server
if (process.env.NODE_ENV != 'test') {
	
	app.listen(port, function () {

		// Log Server Port to the Console.
		console.log("Server Listening at http://localhost:" + port);

	})
 
}

module.exports = app;