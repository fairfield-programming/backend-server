

/**
 * @module Unfollow User Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to unfollow a specific user, if already a follower and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.unfollowUser = async (req, res) => {

  if (!req.params.followeeId) {
    return res.status(400).send({ msg: "Not All Parameters Provided." });
  }


  try {

    const [followee, user] = await Promise.all([

      User.findOne({
        where: {
          id: req.params.followeeId,
        },
      }),

      User.findOne({
        where: {
          id: req.user.id,
        },
      })

    ])


    if (!followee) {
      return res.status(404).send({ msg: 'Followee user not found.' });
    }

    if (!user) {
      return res.status(404).send({ msg: 'Current user not found.' });
    }

    if (!followee.hasFollower(user)) {
      return res.status(401).send({ msg: 'Your are not following this person.' });
    }




    followee.removeFollower(user);

    return res.status(200).send({ msg: 'Your are not longer following this person.' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: 'Error on unfollowing a user.' });
  }

};
