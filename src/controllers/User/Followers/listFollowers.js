
/**
 * @module List Followers Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller allows to see the followers of a given user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.listFollowers = async (req, res) => {

	if (!req.params.id) {
		return res.status(400).send({ msg: "Not All Parameters Provided." });
	}

	try {

		const userFollowersList = await User.findOne({
			where: {
				id: req.params.id,
			},
			include: 'Follower',
		});

		if (!userFollowersList) {
			return res.status(404).send({ msg: "User not found." });
		}

		return res.status(200).json(userFollowersList.Follower);

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on listing followers.' });
	}


};
