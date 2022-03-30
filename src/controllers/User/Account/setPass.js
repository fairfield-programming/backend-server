const {
  compare,
  hash,
} = require("bcrypt");
const { handleError500 } = require("../../../library/errorHandler");



/**
 * @module Set Account Password Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to update his account password, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.setPass = (req, res) => {
  if (!req.params.id || !req.body.password || !req.body.newPassword) return res.status(400).send("Not All Parameters Given.");


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

            userData
              .update(
                { password: hashString },
              )
              .then((newUserData) => {
                newUserData
                  .save()
                  .then(() => res.status(200).send("Success."))
                  .catch((error) => {
                    console.log(error);
                    return res.status(500).send("Internal Server Error.");
                  });
              })
              .catch((error) => handleError500(error));
          });
        },
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
