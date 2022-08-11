
/**
 * @module List One User Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller allows to read a specific post written by a given user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.listOneUserPost = async (req, res) => {


    // fetch the requested post.

    const foundPost = await Post.findOne({
        where: {
            id: req.params.postId,
        },
        attributes: ['title', 'content', 'ownerId'],
    })

    if (!foundPost) {
        return res.status(404).send('Post ressource not found.');
    }

    // check if the given user is the owner. 

    if (req.params.id != foundPost.ownerId) {
        return res.status(403).send('The requested post does not belong to the selected user.');
    }


    // send back to the user the fetched data.

    return res.status(200).json(foundPost);
}

