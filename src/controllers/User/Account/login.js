const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

/**
 * @module login
 * 
 * HTTP POST Request on "/login" handler
 * @param {Request} req - HTTP POST Request on "/login"
 * @param {Response} res - HTTP Response
 * @returns {Response}  HTTP Response
 * @description This route handler will listen to the client request,
 * check if all parameter are good, look if there is a user in the database with the passed credentials
 * then if all goes well, send back a cookie to the client.
 */

module.exports.login = async (req, res) => {

	if ((!req.body.email && !req.body.username) || !req.body.password) {
		return res.status(400).send({ msg: 'Not All Parameters Given.' });
	}

	try {

		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ username: req.body.username, },
					{ email: req.body.email, },
				],
			},
		});

		if (!user) return res.status(404).send({ msg: 'Account Not Found.' });

		compare(req.body.password, user.password, (err, result) => {

			if (!result || err) return res.status(403).send({ msg: 'Invalid Credentials.' });

			res.json({
				token: sign(
					{
						id: user.id,
						username: user.username,
						email: user.email,
					},
					process.env.JWT_KEY,
				),
			});

			res.status(200).send({ msg: 'Logged in.' })
		});

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on login in.' })
	}

}
