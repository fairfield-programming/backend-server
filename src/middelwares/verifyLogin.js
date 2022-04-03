const { verify } = require('jsonwebtoken');


/**
 *  Verfies if the user is logged in, otherwise redirect to "/login"
 * @param {Request} req HTTP Request
 * @param {Response} res HTTP Response
 * @param {Middelware} next calls the next middelware
 * @returns {Response}
 */

module.exports.verifyLogin = (req, res, next) => {
  
  let header = req.get("Authorization") || "";
  let parts = header.split(" ");
  
  if (parts.length != 2) return res.status(403).send("Not Logged In.");
  
  let token = parts[1];
  
  verify(token, process.env.JWT_KEY, (err, userData) => {
    if (err) return res.status(400).send(err.message);
    req.user = userData;
    next();
  })
  
}
