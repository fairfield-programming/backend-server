
/**
 * @module Block User Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to block a specific user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */



module.exports.blockUser = async (req, res) => {
	if (!req.params.id || !req.params.blockId) {
		return res.status(400).send({ msg: "Not All Parameters Provided." });
	}

	try {

		const [user, userToBlock] = Promise.all([
			await User.findOne({
				where: {
					id: req.user.id,
				},
			})
			,
			await User.findOne({
				where: {
					id: req.params.blockId,
				},
			})
		])
		if (!userToBlock) {
			return res.status(404).send({ msg: "Account to block Not Found." });
		}
		if (!user) {
			return res.status(404).send({ msg: 'Current account not found.' })
		}

		user.addBlocked(userToBlock);

		return res.status(200).send({ msg: 'User blocked.' });

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on blocking user.' });
	}
};
