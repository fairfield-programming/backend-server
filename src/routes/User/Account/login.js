const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

function is_req_body_okey(req) {
  if (req.body.email && req.body.username && req.body.password) return true;
  return false;
}

module.exports = (req, res) => {
  if (!is_req_body_okey(req)) return res.status(400).send("Not All Parameters Given.");

  User.findOne(
    {
      where:
      {
        [Op.or]: [
          {
            username: req.body.username || "",
          },
          {
            email: req.body.email || "",
          }],
      },
    },
  )
    .then((userData) => {
      if (!userData) return res.status(404).send("Account Not Found.");

      compare(
        req.body.password,
        userData.password,
        (err, result) => {
          if (!result) return res.status(403).send("Invalid Credentials.");

          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error.");
          }


          // save the token.
          const token = sign(
            {
              id: userData.id,
              username: userData.username,
              email: userData.email,
            },
            process.env.JWT_KEY,
          );

          // send back the token to the user via a cookie
            res.cookie("token", token);

          // redirect the user to the /user page

          res.redirect("/user");


        }
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
