const { missingEventParameters } = require('../../library/eventsUtils');


/**
 * @module Create Event Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to create his own event, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.createEvent = async (req, res) => {

	if (!req.user) {
		return res.status(400).send({ msg: 'Not logged in.' });
	}


	if (missingEventParameters(req)) {
		return res.status(400).send({ msg: 'Missing parameters' });
	}

	try {

		const [event, created] = await Event.findOrCreate({

			where: {
				name: req.body.name,
				location: req.body.location,
				description: req.body.description,
				host: req.body.host,
				status: req.body.status,
				eligibleProfiles: req.body.eligibleProfiles,
				date: req.body.date,
				ownerId: req.user.id,
			}
		});

		if (!created) return res.status(400).send({ msg: 'Event already exist.' });

		const user = await User.findOne({ where: { id: req.user.id } });

		if (!user) return res.status(404).send({ msg: 'Current user not found.' });

		user.addEvents(event);

		return res.json({
			name: event.name,
			location: event.location,
			description: event.description,
			host: event.host,
			eventImage: event.eventImage,
			status: event.status,
			eligibleProfiles: event.eligibleProfiles,
			date: event.date,
		});

	} catch (err) {
		console.log(err.message);
		return res.status(400).send({ msg: 'Error on creating event.' });
	}
};
