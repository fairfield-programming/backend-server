const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
    try {
        // get the user id from the jwt on the req.params
        const id = verify(req.params.token, process.env.Email_Token_Signature)

        // fetch our db for the corresponding user record, and set the email_confirmed attribute to true;
        await User.update({ confirmed_email: true }, { where: { id: id } }); // use the global User object

        // check if the user token is availibe inside a cookie 
        // this means that the user has logged in to our platform, and still has a not expired cookie
        if (req.cookies.token) res.redirect("/");
        else res.redirect("/login");
    } catch (err) {
        res.status(500).send(err.message);
    }
}