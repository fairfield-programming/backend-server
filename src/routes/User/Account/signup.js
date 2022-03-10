const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const cookie = require("cookie");
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

module.exports = (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) return res.status(400).send("Not All Parameters Provided.");
  if (invalidPassword(password)) return res.status(400).send("Password Not Corresponding The Format (between 4 to 14 characters, including both alphanumerical and non-alphanumerical symbols).");
  if (invalidEmail(email)) return res.status(400).send("Email Not Corresponding The Format (remove the blank spaces or invalid dots).");
  if (invalidUsername(username)) return res.status(400).send("Username Not Corresponding The Format (use lowercase alphabetical characters only, and omit the spaces).");
  
  // Find All Users with Similar Usernames and Emails
  User.findAll(
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
      if (accountExists(userData)) res.status(403).send("Account Already Exists.");
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

                // send back the token to the user via a cookie
                // the cookie will be sent back in each up comming req within the req.cookie(s) 
                // or the req.headers.cookie(s) objects

                res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
                  // set these params to maximize security, 
                  // NOTE: secure can break up somethings in the localhost env.

                  httpOnly: true,
                  secure: true, // for https
                }));


                res.redirect("/user");

              }
              )
              .catch((userCreateErr) => handleError500(req, res, userCreateErr));
          }
        });
      }
    })
    .catch((hashErr) => { handleError500(req, res, hashErr); });

};
