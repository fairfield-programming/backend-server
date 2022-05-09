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

  try {

    verify(req.cookies.token, process.env.JWT_KEY, (err, userData) => {

      if (err || !userData) {
        return res.status(400).send({ msg: 'Error on verifying user login.' });
      }

      req.user = userData;
      return next();
    });

  } catch (err) {
    console.log(err.message);
    return res.redirect('/login');
  }

};
