const jokeLib = require('./jokeFinder');

/**
 * @module Get Jokes Count Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get the amount of jokes availible.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getJokeCount = (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	return res.send(jokeLib.getJokeCount().toString());
};
