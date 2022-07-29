
/**
 * @module Create Post Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to create his own post, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */




module.exports.createPost = (req, res) => {

    // check if all the parameters are valid.

    const { postTitle, postContent } = req.body;

    if (!postTitle || !postContent) {
        return res.status(400).send('post content or post title cannot be blank.');
    }

    // create a new post record

    Post.create({
        title: postTitle,
        content: postContent,
        ownerId: 1,
        // ownerId: req.user.id,
    })


    // inform the user with the process status.

    return res.status(200).send('post created');
}

