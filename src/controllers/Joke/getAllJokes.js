const jokeLib = require('./jokeFinder');


/**
 * @module Get All Jokes Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user get all the jokes availible.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getAllJokes = (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	return res.json(jokeLib.getAllJokes());
};
