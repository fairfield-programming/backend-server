
/**
 * @module list Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller allows to list all the posts related to a specific user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.listPosts = async (req, res) => {

    // check if all the parameters are valid.

    if (!req.params.id) {
        return res.status(400).send('user id can not be null.');
    }


    // list the user posts.

    const foundPosts = await Post.findAll({
        where: {
            ownerId: req.params.id,
        },
        attributes: ['title', 'content'],
    })

    if (!foundPosts) {
        return res.status(404).send('This user did not posted yet.');
    }

    // send back to the user the fetched data.

    return res.status(200).json(foundPosts);
}

