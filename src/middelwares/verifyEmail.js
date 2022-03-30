
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

    if (currentUser && !currentUser.confirmed_email)
      return res.status(401).send("Please Confirm Your Email Address By Clicking On the Link Sent To Your MailBox");

    next();

  } catch (err) {
    res.send(err.message);
  }
}
