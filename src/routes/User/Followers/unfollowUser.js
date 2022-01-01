const { handleError500 } = require("../../../library/errorHandler");

module.exports = (req, res) => {
  if (!req.user) res.status(403).send("Not Logged In.");
  if (!req.params.id || !req.params.followerId) res.status(400).send("Not All Parameters Provided.");
  else {
    User.findOne(
      {
        where:
        {
          id: req.params.followerId,
        },
      },
    )
      .then((followeeData) => {
        User.findOne(
          {
            where:
            {
              id: req.user.id,
            },
          },
        )
          .then((followerData) => {
            if (!followerData.hasFollower(followeeData)) {
              res.status(401).send("You do not follow this person");
            } else {
              followeeData
                .removeFollower(followerData)
                .then(() => res.json(followeeData))
                .catch((error) => handleError500(error));
            }
          })
          .catch((error) => handleError500(error));
      })
      .catch((error) => handleError500(error));
  }
};
