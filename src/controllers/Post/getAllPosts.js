
/**
 * @module Get All Posts Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller allows to read a all the existing posts, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.getAllPosts = async (req, res) => {

    // fetch all the posts.

    const foundPosts = await Post.findAll({
        attributes: ['title', 'content'],
    })

    if (!foundPosts || !foundPosts.length ) {
        return res.status(404).send('No posts for now.');
    }

    // send back to the user the fetched data.

    return res.status(200).json(foundPosts);
}

