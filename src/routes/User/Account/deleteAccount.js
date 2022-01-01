const { compare } = require("bcrypt");
const { handleError500 } = require("../../../library/errorHandler");

module.exports = (req, res) => {
  if (!req.params.id) res.status(400).send("Not All Parameters Given.");
  if (!req.user) res.status(403).send("Not Logged In.");
  if (req.user.id !== req.params.id) res.status(401).send("Not Authorized.");
  else {
    User.findOne(
      {
        where:
        {
          id: req.params.id,
        },
      },
    )
      .then((userData) => {
        if (!userData) return res.status(404).send("User Not Found.");

        compare(
          req.body.password,
          userData.password,
          (err, result) => {
            if (err) handleError500(err);
            else if (!result) return res.status(403).send("Incorrect Password.");
            else {
              userData
                .destroy()
                .then(() => res.status(200).send("Success."))
                .catch((error) => handleError500(error));
            }
          },
        );
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
      });
  }
};
