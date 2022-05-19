// imported Article model
const Article = require('../../models/Article');

/**
 * @module Query Article Controller
 *
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
		// Article model was not initially imported
		const article = await Article.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!article) {
			return res.status(404).send({ msg: 'Article not found' });
		}

		return res.status(200).json(article);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on querying an article.' });
	}
};
