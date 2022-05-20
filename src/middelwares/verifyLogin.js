const { verify } = require('jsonwebtoken');
// import express types
const { Response, NextFunction } = require('express');

/**
 * @module VERIFY LOGIN
 *
 *
 * @param {import('../typings').Express.IRequest} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {NextFunction} next calls the next middelware
 *
 * @description
 *  Verfies if the user is logged in, otherwise redirect to "/user/login"
 */

module.exports.verifyLogin = (req, res, next) => {
	let bearer = req.header('Authorization');
	let bearerParts = bearer.split(' ') || [];
	let token = bearerParts[1] || '';

	try {
		verify(token, process.env.JWT_KEY, (err, userData) => {
			if (err || !userData) {
				return res.status(400).send({ msg: 'Error on verifying user login.' });
			}

			req.user = userData;
			return next();
		});
	} catch (err) {
		console.log(err.message);
		return res.redirect('https://fairfieldprogramming.org/login');
	}
};
