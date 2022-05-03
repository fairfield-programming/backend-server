/**
 * @module Query Article Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see the details of a specific article.
 * 
 * @todo
 * Nothing for now.
 * 
 */

module.exports.queryArticle = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ msg: 'Missing parameters' });
  }

  try {
    const articles = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!articles?.length) {
      return res.status(404).send({ msg: 'No articles found' });
    }

    return res.json({ articles });
  } catch (e) {
    return res.status(500).send({ msg: 'Server error' });
  }
};
