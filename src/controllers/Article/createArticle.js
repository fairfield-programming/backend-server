const { handleError500 } = require('../../library/errorHandler');

function missingParameters(req) {
	const { title, description, body } = req.body;
	return !title || !description || !body;
}

/**
 * @module Create Article Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to create a new article if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */
module.exports.createArticle = async(req, res) => {
	if (missingParameters(req)) res.status(400).send("Not All Parameters Provided.");
 	try {
		const article = await Article.create({
			title: req.body.title,
			description: req.body.description,
			body: req.body.body,
		});

		return res.json({ article });
	} catch (e) {
		handleError500(req, res, e);
	}
};
