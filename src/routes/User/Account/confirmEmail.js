const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
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