const {
  compare,
  hash,
} = require("bcrypt");

module.exports = (req, res) => {
  if (!req.params.id || !req.body.password || !req.body.newPassword) return res.status(400).send("Not All Parameters Given.");

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
      compare(
        req.body.password,
        userData.password,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error.");
          }
          if (!result) return res.status(403).send("Incorrect Password.");

          // Hash New Password
          hash(req.body.newPassword, 10, (newPassErr, hashString) => {
            if (newPassErr) {
              console.log(newPassErr);
              return res.status(500).send("Internal Server Error.");
            }

            // Update Password
            userData
              .update(
                { password: hashString },
              )
              .then((newUserData) => {
                // Save the Data
                newUserData
                  .save()
                  .then(() => res.status(200).send("Success."))
                  .catch((error) => {
                    console.log(error);
                    return res.status(500).send("Internal Server Error.");
                  });
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).send("Internal Server Error.");
              });
          });
        },
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
