const { missingParameters } = require('../../library/eventsUtils');


/**
 * @module Create Event Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to create his own event, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.createEvent = (req, res) => {
	if (!req.user) {
		return res.status(400).send({ msg: 'You must be logged in to create an event' });
	}


	if (missingParameters(req)) {
		return res.status(400).send({ msg: 'Missing parameters' });
	}

	try {
		const eventData = await Events.create({
			name: req.body.name,
			location: req.body.location,
			description: req.body.description,
			host: req.body.host,
			status: req.body.status,
			date: req.body.date,
			ownerId: req.user.id,
		});

		const user = await User.findOne({ where: { id: req.user.id } });

		await user.addEvents(eventData);

		return res.json({
			name: eventData.name,
			location: eventData.location,
			description: eventData.description,
			host: eventData.host,
			eventImage: eventData.eventImage,
			status: eventData.status,
			date: eventData.date,
		});
	} catch (e) {
		return res.status(400).send({ msg: 'Error creating event' });
	}
};
