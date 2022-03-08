const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {

    try {
        // get the user id from the jwt on the req.params
        let id = verify(req.params.token, process.env.Email_Token_Signature)
        await User.findOne({ where: { id: id } }).then((data) => console.log(data));
        // fetch our db for the corresponding user record, and set the email_confirmed attribute to true;

        // use the global User object
        await User.update({ confirmed_email: true }, { where: { id: id } })
        await User.findOne({ where: { id: id } }).then((data) => console.log(data));
        

        res.send(id);

    } catch (err) {
        res.status(500).send(err.message);
    }

}