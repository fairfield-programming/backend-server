const { User } = require('../../../models');
// import Express types
const { Response, Request } = require('express');
/**
 * @module Query User Controller
 *
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to get a specific user, if all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.queryUser = async (req, res) => {
	if (!req.params.id) {
		return res.status(400).send({ msg: 'Not All Parameters Provided.' });
	}

	try {
		const user = await User.findOne({
			where: {
				id: req.params.id,
			},

			attributes: ['username', 'email', 'profilePicture', 'biography', 'createdAt'],
		})

		if (!user) return res.status(404).send({ msg: 'Not Found.' });

		return res.status(200).json(user);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on searching for a user.' });
	}
};
