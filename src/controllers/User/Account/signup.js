const fs = require('fs');
const path = require('path');
const { hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { mailer } = require('../../../helpers/mailer');

const {
	invalidPassword,
	invalidUsername,
	invalidEmail
} = require('../../../library/validator');



/**
 * @module SIGNUP
 * 
 * 
 * @param {Request} req - HTTP POST Request on "/user/signup" 
 * @param {Response} res - HTTP Response 
 * @returns {Response}  HTTP Response
 * @description This route handler will listen to the client request, 
 * check if all parameter are good. Then if there was not a user with the same credentials, 
 * it will create a new account and send back a cookie and an email so as the client can confirm
 * his email address.
 */

module.exports.signup = async (req, res) => {

	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return res.status(400).send({ msg: "Not All Parameters Provided." });
	}
	if (invalidPassword(password)) {
		return res.status(400).send({
			msg: "Password Not Corresponding The Format (between 4 to 14 characters, including both alphanumerical and non-alphanumerical symbols)."
		});
	}
	if (invalidEmail(email)) {
		return res.status(400).send({
			msg: "Email Not Corresponding The Format (remove the blank spaces or invalid dots)."
		});
	}
	if (invalidUsername(username)) {
		return res.status(400).send({
			msg: "Username Not Corresponding The Format (use lowercase alphabetical characters only, and omit the spaces)."
		});
	}
	try {
		// Find All Users with Similar Usernames and Emails
		const users = await User.findAll({
			where: {
				[Op.or]: [
					{ username: req.body.username },
					// { email: req.body.email }
				],
			},
		})


		if (users?.length) return res.status(403).send({ msg: "Account Already Exists." });

		const hashString = hash(req.body.password, 10, (err, hashString) => {
			if (err) return res.status(500).send({ msg: "Error on signup." })
			return hashString;
		});

		const newUser = await User.create({
			username: req.body.username,
			password: hashString,
			email: req.body.email,
			profilePicture: "https://fairfield-programming.herokuapp.com/duck/10001000005000043/",
			biography: "This user hasn't set a biography yet...",
			confirmed_email: false,
			status: "",
		})

		// generate token
		const id_token = sign({ id: newUser.id }, process.env.EMAIL_TOKEN, { expiresIn: "10 days", });

		// build-up the email markup
		let emailData = fs.readFileSync(path.join(process.cwd(), "/res/emails/confirmEmail.html"), 'ascii');

		emailData = emailData.replace('${data.username}', newUser.username);
		emailData = emailData.replace('${id_token}', id_token);

		// send the email
		mailer(emailData, String(newUser.email), 'Confirm Your Email Address.');

		return res.status(200).json({
			token: sign(
				{
					id: newUser.id,
					username: newUser.username,
					email: newUser.email,
				},
				process.env.JWT_KEY,
			),
			id: newUser.id
		});



	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on signup.' });
	}
};
