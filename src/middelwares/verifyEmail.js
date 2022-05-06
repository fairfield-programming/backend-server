
/**
 * @module VERIFY EMAIL 
 * 
 * 
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middelware} next calls the next middelware
 * @returns {Response}
 * 
 * @description
 *   Verfies if the user has a confimed email address, otherwise ask the user to confirm their email address.
 */


module.exports.verifyEmail = async (req, res, next) => {
	try {

		const currentUser = await User.findOne({ where: { id: req.user.id } });

		if (!currentUser?.confirmed_email) {
			return res.status(401).send({
				msg: 'Please confirm your email address, then try logging in.'
			});
		}

		return next();

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on verifying email address.' });
	}
};
