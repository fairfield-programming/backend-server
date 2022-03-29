const { verify } = require('jsonwebtoken');


/**
 *  Verfies if the user is logged in, otherwise redirect to "/login"
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middelware} next calls the next middelware
 * @returns {Response}
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
