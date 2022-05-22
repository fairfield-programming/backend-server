
/**
 * @module RSVP Events Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to subscribe to an event, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */



module.exports.rsvpEvent = async (req, res) => {

	if (!req.user) return res.status(403).send({ msg: 'Not Logged In.' });
	if (!req.params.id) return res.status(400).send({ msg: 'Not All Parameters Provided.' });

	try {

		const [event, user] = await Promise.all([

			Events.findOne({
				where: {
					id: req.params.id,
				},
			})
			,
			User.findOne({
				where: {
					id: req.user.id,
				}
			})
		])



		if (!event) {
			return res.status(404).send({ msg: 'Event not found.' });
		}
		if (!user) {
			return res.status(400).send({ msg: 'Current user not found' });
		}

		user.addEvents(event);

		res.status(200).json(event);



	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on subscribing to an event.' });
	}
};
