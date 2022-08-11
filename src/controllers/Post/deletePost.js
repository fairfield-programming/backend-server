
/**
 * @module Delete Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to delete his own post, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.deletePost = async (req, res) => {


    if (!req.params.postId) {
        return res.status(400).send('invalid post id.');
    }

    // find the original post.

    const foundPost = await Post.findOne({
        where: {
            id: req.params.postId,
        }
    });

    // check that it exists.

    if (!foundPost) {
        return res.status(404).send({ msg: 'The post that you are trying to update does not exist.' });
    }

    // check if the owner is the active user.

    if (foundPost.ownerId != req.user.id) {
        return res.status(401).send({ msg: 'You are not allowed to change a ressource that you do not own.' })
    }

    foundPost.destroy()


    // inform the user with the process status.

    return res.status(200).send('post deleted');
}

