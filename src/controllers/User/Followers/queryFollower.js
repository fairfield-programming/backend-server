const { User } = require('../../../models');
// import Express types
const { Response } = require('express');

/**
 * @module Query Follower Controller
 *
 * @param {import('../../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to see a specific follower, if all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.queryFollower = async (req, res) => {
	if (!req.params.id || !req.params.followerId) {
		return res.status(400).send({ msg: 'Not All Parameters Provided.' });
	}

	try {
		// follower is following the followee.
		// followee is followed by the follower.

		const [follower, followee] = await Promise.all([
			User.findOne({
				where: {
					id: req.params.followerId,
				},
			}),

			User.findOne({
				where: {
					id: req.params.id,
				},
			}),
		]);

		if (!follower) {
			return res.status(404).send({ msg: 'Follower user not found.' });
		}

		if (!followee) {
			return res.status(404).send({ msg: 'Followee user not found.' });
		}

		if (!followee.hasFollower(follower)) {
			return res.status(401).send({
				msg: `User with id=${req.params.id} is not followed by user with id=${req.params.followerIdI}`,
			});
		}

		return res.status(200).json(follower);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on searching for users followers.' });
	}
};
