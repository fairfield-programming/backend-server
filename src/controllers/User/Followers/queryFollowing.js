
/**
 * @module Query Follower Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see a specific account that he follows,
 *  if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.queryFollowing = async (req, res) => {

    if (!req.params.followingId) {
        return res.status(400).send({ msg: "Not All Parameters Provided." });
    }

    try {

        const [user, followee] = await Promise.all([
            User.findOne({
                where: {
                    id: req.user.id,
                },
            }),

            User.findOne({
                where: {
                    id: req.params.followingId,
                },
            })

        ])

        if (!user) {
            return res.status(404).send({ msg: 'Current user not found.' });
        }

        if (!followee) {
            return res.status(404).send({ msg: 'Followee user not found.' });
        }


        const alreadyFollower = await followee.hasFollower(user);
        
        if (!alreadyFollower) {
            return res.status(400).send({ msg: 'You are not following this person.' });
        }

        return res.status(200).json(followee);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ msg: 'Error on searching for a specific following.' });
    }

};
