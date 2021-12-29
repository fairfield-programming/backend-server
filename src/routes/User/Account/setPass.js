module.exports = (req, res) => {
  if (req.params.id == undefined)
    return res.status(400).send("Not All Parameters Given.");
  if (req.body.password == undefined)
    return res.status(400).send("Not All Parameters Given.");
  if (req.body.newPassword == undefined)
    return res.status(400).send("Not All Parameters Given.");

  if (req.user == undefined) return res.status(403).send("Not Logged In.");

  if (req.user.id != req.params.id)
    return res.status(401).send("Not Authorized.");

  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(function (userData) {
      bcrypt.compare(
        req.body.password,
        userData.password,
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error.");
          }
          if (!result) return res.status(403).send("Incorrect Password.");

          // Hash New Password
          bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
            if (err) {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            }

            // Update Password
            userData
              .update({
                password: hash,
              })
              .then(function (newUserData) {
                // Save the Data
                newUserData
                  .save()
                  .then(function () {
                    return res.status(200).send("Success.");
                  })
                  .catch(function (error) {
                    console.log(error);
                    return res.status(500).send("Internal Server Error.");
                  });
              })
              .catch(function (error) {
                console.log(error);
                return res.status(500).send("Internal Server Error.");
              });
          });
        }
      );
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
