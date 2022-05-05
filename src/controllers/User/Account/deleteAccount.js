const { compare } = require('bcrypt');


/**
 * @module Delete Account Controller
 * 
 * @param {Request} req - HTTP Request from the client
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
	if (!req.params.id) return res.status(400).send({ msg: 'Not All Parameters Given.' });
	if (!req.user) return res.status(403).send({ msg: 'Not Logged In.' });
	if (req.user.id !== req.params.id) return res.status(401).send({ msg: 'Not Authorized.' });

	try {

		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
		})

		if (!user) return res.status(404).send({ msg: 'User Not Found.' });

		compare(req.body.password, user.password, (err, result) => {

			if (!result || err) return res.status(403).send({ msg: 'Invalid Credentials.' });

			user.destroy();
			return res.status(200).send({ msg: 'Account Deleted.' });
		});

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on deleting account.' });
	}

};
