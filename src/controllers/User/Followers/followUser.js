const { User } = require('../../../models');
// import Express types
const { Response } = require('express');

/**
 * @module Follow User Controller
 *
 * @param {import('../../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to follow a specific user, if all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.followUser = async (req, res) => {
	if (!req.params.followeeId) {
		return res.status(400).send({ msg: 'Not All Parameters Provided.' });
	}

	try {
		const [user, userToFollow] = await Promise.all([
			User.findOne({
				where: {
					id: req.user.id,
				},
			}),

			User.findOne({
				where: {
					id: req.params.followeeId,
				},
			}),
		]);

		if (!userToFollow) {
			return res.status(404).send({ msg: 'User to follow  not found.' });
		}

		if (!user) {
			return res.status(404).send({ msg: 'Current account not found.' });
		}

		if (userToFollow.hasFollower(user)) {
			return res.status(401).send({ msg: 'You are already following this person.' });
		}

		userToFollow.addFollower(user);

		return res.status(200).send({ msg: 'You are now following this person.' });
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on following a user.' });
	}
};
