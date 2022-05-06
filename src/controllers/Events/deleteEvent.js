
/**
 * @module Delete Event Controller
 * 
 * @param {Request} req - HTTP Request from the client
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
		})

		if (!event) {
			return res.status(400).send({ msg: 'Event does not exist' });
		}

		if (event.ownerId !== req.user.id) {
			return res.status(401).send({ msg: 'Not Authorized to Delete' });
		}



		const users = await User.findAll({
			where: {
				events: event,
			},
		})

		Promise.allSettled([
			await users.removeEvents(event),
			await event.destroy()
		])

	} catch (err) {
		return res.status(500).send({ msg: 'Error deleting event' });
	}
};
