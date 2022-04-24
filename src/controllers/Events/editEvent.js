const Events = require('../../models/Events');
const { missingParameters } = require('../../library/eventsUtils');
const { detectVulgarWords } = require('../../library/VulgarTest');




/**
 * @module Edit Event Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to edit his own event, if all parameters are correct, and no vulgar language detected.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.editEvent = (req, res) => {
	if (!req.user) return res.status(403).send('Not Logged In.');
	if (missingParameters(req)) return res.status(400).send('Not All Parameters Provided.');

	Events.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((eventData) => {
			if (eventData.ownerId !== req.user.id) {
				return res.status(401).send('Not Authorized to Edit');
			}

			if (!req.body.status) {
				if (detectVulgarWords(req.body.status)) return res.status(406).send('Vulgar Language Detected.');
			}

			eventData
				.update({
					name: req.body.name,
					location: req.body.location,
					description: req.body.description,
					host: req.body.host,
					status: req.body.status,
					date: req.body.date,
				})
				.then((newData) => res.status(200).send(newData.status))
				.catch((error) => {
					console.log(error);
					return res.status(500).send('Internal Server Error.');
				});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
