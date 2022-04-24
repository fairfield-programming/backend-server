const { verify } = require('jsonwebtoken');

/**
 *  Verfies if the user is logged in, otherwise redirect to "/login"
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middleware} next calls the next middleware
 * @returns {Response}
 */

module.exports.verifyLogin = (req, res, next) => {
	if (req.cookies.token) {
		verify(req.cookies.token, process.env.JWT_KEY, (err, userData) => {
			if (err) {
				return res.status(400).send(err.message);
			}
			req.user = userData;
			return next();
		});
	}

	return res.redirect('/login');
};
