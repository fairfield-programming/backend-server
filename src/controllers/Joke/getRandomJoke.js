const jokeLib = require('./jokeFinder');

/**
 * @module Get Random Joke Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get a random joke.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getRandomJoke = (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	return res.send(jokeLib.getRandomJoke());
};
