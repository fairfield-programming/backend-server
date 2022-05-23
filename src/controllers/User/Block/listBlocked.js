
/**
 * @module List Blocked Users Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see the his own blocked Users list, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.listBlocked = async (req, res) => {

  if (!req.user) return res.status(403).send({ msg: 'Not Logged In.' });

  try {

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    })

    if (!user) {
      return res.status(404).send({ msg: 'User not found.' });
    }

    const blockedUsers = await user.getBlocked();
    return res.status(200).json(blockedUsers);

  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "Error on listing blocked users." });
  }
};

