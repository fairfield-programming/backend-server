
/**
 * @module Get Users Count Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get the users count.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.countUsers = async (req, res) => {

	try {
		const usersCount = await User.count({})

		return res.status(200).json({ count: usersCount });

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on getting users count.' });
	}

};
