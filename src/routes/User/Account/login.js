const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = (req, res) => {
  if (!req.body.email || !req.body.username || !req.body.password) return res.status(400).send("Not All Parameters Given.");

  User.findOne({
      where:{
        [Op.or]: [
          {
            username: req.body.username || "",
          },
          {
            email: req.body.email || "",
          }],
      },
  }).then((userData) => {

      if (!userData) return res.status(404).send("Account Not Found.");

      compare(req.body.password, userData.password, (err, result) => {

          if (!result) return res.status(403).send("Invalid Credentials.");

          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error.");
          }

          // In order to support an open-api and multiple platforms, cookies cant be used.
          // User sessions will need to be stored on the client side.

          res.json({ token: sign(
            {
              id: userData.id,
              username: userData.username,
              email: userData.email,
            },
            process.env.JWT_KEY,
          )});

        }
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
