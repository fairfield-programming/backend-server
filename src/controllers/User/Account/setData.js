const vulgarTester = require('../../../library/VulgarTest');
// import Express types
const { Response } = require('express');

const { User } = require('../../../models');
/**
 * @module Set Account Data Controller
 *
 * @param {import('../../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to update his account data, if no vulgar language detected and all parameters are correct.
 *
 * @todo
 * Nothing for now.
 */

module.exports.setData = async (req, res) => {
	if (!req.user) return res.status(403).send({ msg: 'Not Logged In.' });

	const { biography, profilePicture, username } = req.body;

	if (!biography || !profilePicture || !username) {
		return res.status(400).send({ msg: 'Not All Parameters Are Given.' });
	}

	try {
		const user = await User.findOne({
			where: {
				id: req.user.id,
			},
		});

		if (!user) return res.status(404).send({ msg: 'Account Not Found.' });

		if (vulgarTester.detectVulgarWords(req.body.biography)) {
			return res.status(406).send({ msg: 'Vulgar Language Detected.' });
		}
		if (vulgarTester.detectVulgarWords(req.body.username)) {
			return res.status(406).send({ msg: 'Vulgar Language Detected.' });
		}

		const updatedUser = await user.update({
			biography: req.body.biography || user.biography,
			profilePicture: req.body.profilePicture || user.profilePicture,
			username: req.body.username || user.username,
		});

		res.status(200).json({
			id: updatedUser.id,
			username: updatedUser.username,
			biography: updatedUser.biography,
			profilePicture: updatedUser.profilePicture,
		});
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on updating account data.' });
	}
};
