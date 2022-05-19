// imported Article model
const Article = require("../../models/Article");

function missingParameters(req) {
	const { title, description, body } = req.body;
	return !title || !description || !body;
}

/**
 * @module Create Article Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to create a new article if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.createArticle = async (req, res) => {

	if (missingParameters(req)) {
		return res.status(400).send({ msg: "Not All Parameters Provided." });
	}

	try {
// Article model was not initially imported
		const article = await Article.create({
			title: req.body.title,
			description: req.body.description,
			body: req.body.body,
		});

		return res.status(200).json(article);

	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on creating an article.' });
	}
};
