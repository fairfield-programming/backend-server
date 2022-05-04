const { verify } = require('jsonwebtoken');

/**
 *  Verfies if the user is logged in, otherwise redirect to "/login"
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middleware} next calls the next middleware
 * @returns {Response}
 */

module.exports.verifyLogin = (req, res, next) => {
	let tokenCookie = req.headers.cookie.split(";").filter(el => el.includes("token"));
	console.log("token cookies are equal to", tokenCookie);
	tokenCookie = tokenCookie[tokenCookie.length - 1];
	console.log("then token cookies is equal to", tokenCookie);

	let token = tokenCookie.split("=")[1];
	console.log("token is  equal to", token);


	if (token) {

		verify(token, process.env.JWT_KEY, (err, userData) => {
			if (err) {
				return res.status(400).send(err.message);
			}
			req.user = userData;
			return next();
		});

	} else {
		return res.redirect('/login');

	}

};
