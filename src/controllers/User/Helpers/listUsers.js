
/**
 * @module Get Users Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get the registred users list.
 * 
 * @todo
 * Nothing for now.
 */
module.exports.listUsers = async (req, res) => {

	try {

		const users = await User.findAll(
			{
				attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
			},
		);

		if (!users?.length) {
			return res.status(404).send({ msg: "No Users." });
		}

		return res.status(200).json(users);

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on listing users.' });
	}



};
