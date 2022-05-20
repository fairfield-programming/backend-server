// import Express types
const { Response } = require('express');

// import Event Model
const { Events } = require('../../models');

/**
 * @module Delete Event Controller
 *
 * @param {import('../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to delete an event of his own, if all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.deleteEvent = async (req, res) => {
	if (!req.user) return res.status(403).send({ msg: 'Not Logged in.' });
	if (!req.params.id) return res.status(400).send({ msg: 'Not All Parameters Provided.' });

	try {
		const event = await Events.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!event) {
			return res.status(400).send({ msg: 'Event not found.' });
		}

		if (event.ownerId !== req.user.id) {
			return res.status(401).send({ msg: 'Not Authorized to Delete' });
		}

		const users = await event.getUsers();

		users.forEach((user) => {
			user.removeEvents(event);
		});

		event.destroy();

		return res.status(200).send({ msg: 'Event deleted.' });
	} catch (err) {
		return res.status(500).send({ msg: 'Error deleting event' });
	}
};
