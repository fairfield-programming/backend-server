/**
 * @module Get Account Status Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user get the status of a registred user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getStatus = async (req, res) => {
	if (!req.params.id) return res.status(400).send({ msg: 'Not All Parameters Provided.' });

	try {

		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!user) return res.status(404).send({ msg: 'Account Not Found.' });

		res.set('Content-Type', 'text/html');

		return res.status(200).send(JSON.stringify(user.status));

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'IError on getting account status.' });
	}

};
