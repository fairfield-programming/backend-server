const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const cookie = require("cookie");
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

                  const id_token = sign({ id: data.id }, process.env.Email_Token_Signature, { expiresIn: "4 days", });
                  let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'fairfieldprogramming@gmail.com',
                      pass: process.env.GMAIL_APP_PASS,
                    },
                  });

                  // send mail with defined transport object
                  transporter.sendMail({
                    from: '"Fairfield Programming Association" <fairfieldprogramming@gmail.com>', // sender address
                    to: `${data.email}`, // list of receivers
                    subject: "Confirm Your Email Address", // Subject line
                    html: `
                    <img src="https://raw.githubusercontent.com/fairfield-programming/.github/main/spread.png" style="width:90%; margin-left:5%;" />
                    <hr/>  
                    <h3 style="text-align:center;padding-buttom:5px;">
                    Welcome to Fairfield Programming Association
                    </h3>
                    <hr/>  
                      <p>
                      <br/>
                      Hey <b>${data.username}</b>,
                      <br/>
                      Please validate your email address on  fairfieldprogramming.org by clicking 
                        <a href="https://fairfieldprogramming.org/confirmEmail/${id_token}">this link</a>.
                        <br/>
                      </p>
                      <p>
                        <br/>
                        Thanks for joining us ! 
                        <br/>
                        Kind Regards.
                        <br/>
                        <address>fairfieldprogramming.org <b> team </b></address>
                      </p>
                      <hr/>
                      <footer style="color:grey">
                          fairfieldprogramming.org is an open-source,
                          non-profit association dedicated to the education of children in the world of computer science.
                          We host competitions, events, and websites in order to forward the learning experience of highschool and college students.
                          Since we are a non-profit and an open-source organization, we would love it if you contribute or donate, 
                          but that is fully up to you!
                      </footer>
                      <hr/>

                    `,
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
