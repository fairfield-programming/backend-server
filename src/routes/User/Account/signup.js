const fs = require("fs");
const path = require("path");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const
  {
    invalidPassword,
    invalidUsername,
    invalidEmail,
  } = require("../../../library/validator");
const { handleError500 } = require("../../../library/errorHandler");

function accountExists(userData) {
  return userData.length > 0;
}

module.exports = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) res.status(400).send("Not All Parameters Provided.");
  else if (invalidPassword(password)) res.status(400).send("Password Not Corresponding The Format (between 4 to 14 characters, including both alphanumerical and non-alphanumerical symbols).");
  else if (invalidEmail(email)) res.status(400).send("Email Not Corresponding The Format (remove the blank spaces or invalid dots).");
  else if (invalidUsername(username)) res.status(400).send("Username Not Corresponding The Format (use lowercase alphabetical characters only, and omit the spaces).");
  else {
    // Find All Users with Similar Usernames and Emails
    await User.findAll(
      {
        where:
        {
          [Op.or]: [
            { username: req.body.username },
            { email: req.body.email }],
        },
      },
    )
      .then((userData) => {
        if (accountExists(userData)) return res.status(403).send("Account Already Exists.");
        else {
          hash(req.body.password, 10, (err, hashString) => {
            if (err) handleError500(req, res, err);
            else {
              User.create(
                {
                  username: req.body.username,
                  password: hashString,
                  email: req.body.email,
                },
              )
                .then((data) => {
                  const token = sign(
                    {
                      id: data.id,
                      username: data.username,
                      email: data.email,
                    },
                    process.env.JWT_KEY,
                  );

                  const id_token = sign({ id: data.id }, process.env.EMAIL_TOKEN, { expiresIn: "4 days", });
                  let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'fairfieldprogramming@gmail.com',
                      pass: process.env.GMAIL_APP_PASS,
                    },
                  });

                  let emailData = fs.readFileSync(path.join(process.cwd(), "/res/emails/confirmEmail.html"), 'ascii');

                  emailData = emailData.replace("${data.username}", data.email);
                  emailData = emailData.replace("${id_token}", id_token);

                  // send mail with defined transport object
                  transporter.sendMail({
                    from: '"Fairfield Programming Association" <fairfieldprogramming@gmail.com>', // sender address
                    to: `${data.email}`, // list of receivers
                    subject: "Confirm Your Email Address", // Subject line
                    html: emailData,
                  });

                  res.json({ token: sign(
                    {
                      id: data.id,
                      username: data.username,
                      email: data.email,
                    },
                    process.env.JWT_KEY,
                  ) });

                }
                )
                .catch((userCreateErr) => handleError500(req, res, userCreateErr));
            }
          });
        }
      })
      .catch((hashErr) => { handleError500(req, res, hashErr); });
  }
};
