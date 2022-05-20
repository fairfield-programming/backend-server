const { User } = require('../../../models');
// import Express types
const { Response } = require('express');

/**
 * @module Query Blocked User Controller
 *
 * @param {import('../../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to fetch a specific blocked user of his own blocked users list, if all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.queryBlock = async (req, res) => {
	if (!req.params.id || !req.params.blockId) {
		return res.status(400).send({ msg: 'Not All Parameters Provided.' });
	}

	try {
		const [blockedUser, user] = await Promise.all([
			User.findOne({
				where: {
					id: req.params.blockId,
				},
			}),
			User.findOne({
				where: {
					id: req.user.id,
				},
			}),
		]);

		if (!blockedUser) {
			return res.status(404).send({ msg: 'Blocked User Not Found.' });
		}
		if (!user) {
			return res.status(404).send({ msg: 'Current account not found.' });
		}

		if (!user.hasBlocked(blockedUser)) {
			return res.status(401).send({ msg: 'You have not blocked this person.' });
		}

		return res.status(200).json(blockedUser);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on searching for a blocked account.' });
	}
};
