const { compare, hash } = require('bcrypt');



/**
 * @module Set Account Password Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to update his account password, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.setPass = async (req, res) => {

	if (!req.user) {
		return res.status(401).send({ msg: 'Not Logged in.' });
	}


	if (!req.body.password || !req.body.newPassword) {
		return res.status(400).send({ msg: 'Not All Parameters Given.' });
	}


	try {
		const user = await User.findOne({
			where: {
				id: req.user.id,
			},
		})

		if (!user) return res.status(404).send({ msg: "Account Not Found." });

		compare(req.body.password, user.password, (err, result) => {
			if (!result || err) return res.status(403).send('Invalid Credentails.');

			// Hash New Password
			hash(req.body.newPassword, 10, (newPassErr, hashString) => {
				if (newPassErr) {
					return res.status(500).send({ msg: 'Error on updating password.' });
				}

				user.update({ password: hashString })

				return res.send(200).send({ msg: "Password Set." })
			});
		});

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on editing password.' });
	}

};