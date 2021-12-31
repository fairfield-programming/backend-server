const { compare } = require("bcrypt");

module.exports = (req, res) => {
  if (!req.params.id) return res.status(400).send("Not All Parameters Given.");
  if (!req.user) return res.status(403).send("Not Logged In.");
  if (req.user.id !== req.params.id) return res.status(401).send("Not Authorized.");

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
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error.");
          }

          if (!result) return res.status(403).send("Incorrect Password.");

          userData
            .destroy()
            .then(() => res.status(200).send("Success."))
            .catch((error) => {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            });
        },
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
