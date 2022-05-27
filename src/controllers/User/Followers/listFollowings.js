
/**
 * @module List Followers Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see the accounts that he is currently following,
 *  if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.listFollowings = async (req, res) => {

    try {

        const userFollowingsList = await User.findOne({
            where: {
                id: req.user.id,
            },
            include: 'Followee',
        });

        if (!userFollowingsList) {
            return res.status(404).send({ msg: "User not found." });
        }

        return res.status(200).json(userFollowingsList.Followee);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ msg: 'Error on listing followings.' });
    }


};
