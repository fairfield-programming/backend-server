const { Events } = require('../../models');
const { missingParameters } = require('../../library/eventsUtils');
const { detectVulgarWords } = require('../../library/VulgarTest');
// import Express types
const { Response } = require('express');

/**
 * @module Edit Event Controller
 *
 * @param {import('../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to edit his own event, if all parameters are correct, and no vulgar language detected.
 *
 * @todo
 * Nothing for now.
 */

module.exports.editEvent = async (req, res) => {
	if (!req.user) return res.status(403).send({ msg: 'Not Logged In.' });
	if (missingParameters(req)) return res.status(400).send({ msg: 'Not All Parameters Provided.' });

	try {
		const event = await Events.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!event) {
			return res.status(400).send({ msg: 'Event does not exist.' });
		}

		if (event.ownerId !== req.user.id) {
			return res.status(401).send({ msg: 'Not Authorized to Edit' });
		}

		if (detectVulgarWords(req.body.status)) {
			return res.status(406).send({ msg: 'Vulgar Language Detected.' });
		}

		await event.update({
			name: req.body.name,
			location: req.body.location,
			description: req.body.description,
			host: req.body.host,
			status: req.body.status,
			date: req.body.date,
		});

		return res.send(200).send({ msg: 'Event updated.' });
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error editing event.' });
	}
};
