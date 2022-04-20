const { handleError500 } = require("../../../library/errorHandler");


/**
 * @module Unfollow User Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to unfollow a specific user, if already a follower and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.unfollowUser = (req, res) => {
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
