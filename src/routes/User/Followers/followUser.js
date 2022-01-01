const { handleError500 } = require("../../../library/errorHandler");

module.exports = (req, res) => {
  if (!req.user) res.status(403).send("Not Logged In.");
  else if (!req.params.id || !req.params.followerId) res.status(400).send("Not All Parameters Provided.");
  else {
    User.findOne(
      {
        where:
        {
          id: req.user.id,
        },
      },
    )
      .then((followerData) => {
        User.findOne(
          {
            where:
            {
              id: req.params.followerId,
            },
          },
        )
          .then((followeeData) => {
            followeeData
              .addFollower(followerData)
              .then(() => res.json(followeeData))
              .catch((error) => handleError500(error));
          })
          .catch((error) => handleError500(error));
      })
      .catch((error) => handleError500(error));
  }
};
