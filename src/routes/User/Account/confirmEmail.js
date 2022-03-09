const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
    try {
        // get the user id from the jwt on the req.params
        let id = verify(req.params.token, process.env.Email_Token_Signature)

        // fetch our db for the corresponding user record, and set the email_confirmed attribute to true;
        await User.update({ confirmed_email: true }, { where: { id: id } }); // use the global User object

        res.send("Your Email had be validated, please go and login so be active on the platform !");

    } catch (err) {
        res.status(500).send(err.message);
    }
}