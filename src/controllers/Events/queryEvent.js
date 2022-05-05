
/**
 * @module Query Event Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to search for a specific event, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */



module.exports.queryEvent = async (req, res) => {
	if (!req.params.id) return res.status(400).send({ msg: 'Not All Parameters Provided.' });

	try {
		const event = await Events.findOne({
			where: {
				id: req.params.id,
			},
		})
		if (!event) {
			return res.status(404).send({ msg: 'Event Not Found.' });
		}

		return res.json(event);

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on searching for an event.' });
	}
};
