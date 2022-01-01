const
  {
    invalidPassword,
    invalidUsername,
    invalidEmail,
  } = require("../../../library/validator");

module.exports = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).send("Not All Parameters Provided.");

  if (invalidPassword(req.body.password)) return res.status(400).send("Invalid Password.");
  if (invalidEmail(req.body.email)) return res.status(400).send("Invalid Email.");
  if (invalidUsername(req.body.username)) return res.status(400).send("Invalid Username.");

  // Find All Users with Similar Usernames and Emails
  User.findAll(
    {
      where:
      {
        [Op.or]: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          }],
      },
    },
  )
    .then((userData) => {
      // If Similar Accounts Exist, Don't Let Them Create an Account
      if (userData.length > 0) return res.status(403).send("Account Already Exists.");

      // Hash the Password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error.");
        }

        // Create the New Account
        User.create(
          {
            username: req.body.username,
            password: hash,
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
          .catch((error) => {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
          });
      });
    })
    .catch((error) => {
      /* istanbul ignore next */
      console.log(error);
      /* istanbul ignore next */
      return res.status(500).send("Internal Server Error.");
    });
};
