const { verify } = require('jsonwebtoken');


/**
 * @module VERIFY LOGIN
 * 
 * 
 * 
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middelware} next calls the next middelware
 * 
 * @description
 *  Verfies if the user is logged in, otherwise redirect to "/user/login"
 */

module.exports.verifyLogin = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    verify(req.cookies.token, process.env.JWT_KEY, (err, userData) => {
      if (err) return res.status(400).send(err.message);
      req.user = userData;
      next();
    })
  }
  else res.redirect("/login");
}
