const { compare } = require('bcrypt');
const { User } = require('../../../models');
// import Express types
const { Response } = require('express');

/**
 * @module Delete Account Controller
 *
 * @param {import('../../../typings').Express.IRequest} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to delete his account.
 * If all goes well,  redirect to "/"  ( root ) .
 * Otherwise, send back an error message.
 *
 * @todo
 * Nothing for now.
 */

module.exports.deleteAccount = async (req, res) => {

	if (!req.user) return res.status(403).send({ msg: 'Not Logged In.' });

	try {
		const user = await User.findOne({
			where: {
				id: req.user.id,
			},
		});

		if (!user) return res.status(404).send({ msg: 'User Not Found.' });

		compare(req.body.password, user.password, (err, result) => {
			if (!result || err) return res.status(403).send({ msg: 'Error on deleting account.' });

			user.destroy();
			return res.status(200).send({ msg: 'Account Deleted.' });
		});
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on deleting account.' });
	}
};
