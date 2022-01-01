const { hash } = require("bcrypt");
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
  else if (invalidPassword(password)) res.status(400).send("Invalid Password.");
  else if (invalidEmail(email)) res.status(400).send("Invalid Email.");
  else if (invalidUsername(username)) res.status(400).send("Invalid Username.");
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
                .then((data) => res.json(
                  {
                    token: jwt.sign(
                      {
                        id: userData.id,
                        username: data.username,
                        email: data.email,
                      },
                      process.env.JWT_KEY,
                    ),
                  },
                ))
                .catch((userCreateErr) => handleError500(req, res, userCreateErr));
            }
          });
        }
      })
      .catch((hashErr) => { handleError500(req, res, hashErr); });
  }
};
