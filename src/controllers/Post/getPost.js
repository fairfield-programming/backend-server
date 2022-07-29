
/**
 * @module Get Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller allows to read a specific post, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.getPost = async (req, res) => {

    // check if all the parameters are valid.

    if (!req.params.postId) {
        return res.status(400).send('post id can not be null.');
    }


    // fetch the requested post.

    const foundPost = await Post.findOne({
        where: {
            id: req.params.postId,
        },
        attributes: ['title', 'content'],
    })

    if (!foundPost) {
        return res.status(404).send('Post ressource not found.');
    }

    // send back to the user the fetched data.

    return res.status(200).json(foundPost);
}

