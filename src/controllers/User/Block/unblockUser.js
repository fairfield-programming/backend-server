

/**
 * @module Block User Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to unblock a specific user, if already blocked and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.unblockUser = async (req, res) => {
  if (!req.params.id || !req.params.blockId) {
    return res.status(400).send({ msg: "Not All Parameters Provided." });
  }

  try {

    const [blockedUser, user] = Promise.all([
      await User.findOne({
        where: {
          id: req.params.blockId,
        },
      }),

      await User.findOne({
        where: {
          id: req.user.id,
        },
      })
    ]);


    if (!blockedUser) {
      return res.status(404).send({ msg: "Blocked User Not Found." });
    }
    if (!user) {
      return res.status(404).send({ msg: 'Current account not found.' });
    }

    if (!user.hasBlocked(blockedUser)) {
      return res.status(401).send({ msg: "You have not blocked this person." });
    }

    user.removeBlocked(blockedUser);

    return res.status(200).send({ msg: 'User unblocked.' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: 'Error on unblocking a user.' });
  }

}
