const jokeLib = require('./jokeFinder');
const { propertyUndefined } = require('../../library/validator');
// import Express types
const { Response, Request } = require('express');
/**
 * @module Get Joke By ID Controller
 *
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user get a specific joke by ID.
 *
 * @todo
 * Nothing for now.
 */
module.exports.getJokeById = (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');

	if (propertyUndefined(req.params.id)) {
		return res.status(400).send({ msg: 'Missing joke ID' });
	}

	const numID = parseInt(req.params.id, 10);
	if (isNaN(numID) || numID % 1 !== 0) {
		return res.status(400).send({ msg: 'Joke ID must be an integer' });
	}

	const joke = jokeLib.getJokeAtIndex(numID);
	if (!joke) {
		return res.status(404).send({ msg: 'Joke not found' });
	}

	return res.send(joke);
};
