const { verify } = require("jsonwebtoken");
/**
 * @module Confirm Email Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to confirm his email address by a GET HTTP request.
 * If all the link is valid, update the user data and redirect to /login.
 * Otherwise, send back an error message and redirect to /login.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.confirmEmail = async (req, res) => {
    try {

        // get the user id from the jwt on the req.params
        const id = verify(req.params.token, process.env.EMAIL_TOKEN).id;

        // fetch our db for the corresponding user record, and set the email_confirmed attribute to true;
        await User.update({ confirmed_email: true }, { where: { id: id } }); // use the global User object

        // if we redirect to login, it will redirect home if already logged in
        res.redirect("https://fairfieldprogramming.org/auth/login");

    } catch (err) {

        console.log(err);
        res.redirect("https://fairfieldprogramming.org/auth/login");
    
    }
}