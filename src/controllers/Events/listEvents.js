const { Events } = require('../../models');

// import Express types
const { Response, Request } = require('express');

/**
 * @module List Events Controller
 *
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to see all the current events, if any.
 *
 * @todo
 * Nothing for now.
 */

module.exports.listEvents = async (req, res) => {
	try {
		const events = await Event.findAll({});

		if (!events?.length) return res.status(404).send({ msg: 'No events for now.' });

		return res.status(200).json(events);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on searching for all events.' });
	}
};
