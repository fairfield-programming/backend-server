const { User } = require('../../../models');
// import Express types
const { Response } = require('express');

/**
 * @module Block User Controller
 *
 * @param {import('../../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to block a specific user, if all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.blockUser = async (req, res) => {
	if (!req.params.blockId) {
		return res.status(400).send({ msg: 'Not All Parameters Provided.' });
	}

	try {
		const [user, userToBlock] = await Promise.all([
			User.findOne({
				where: {
					id: req.user.id,
				},
			}),
			User.findOne({
				where: {
					id: req.params.blockId,
				},
			}),
		]);
		if (!userToBlock) {
			return res.status(404).send({ msg: 'Account to block Not Found.' });
		}
		if (!user) {
			return res.status(404).send({ msg: 'Current account not found.' });
		}
		if (user.hasBlocked(userToBlock)) {
			return res.status(400).send({ msg: 'You have already blocked this person.' });
		}

		user.addBlocked(userToBlock);

		return res.status(200).send({ msg: 'User blocked.' });
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on blocking user.' });
	}
};
