const { handleError500 } = require('../../library/errorHandler');

function missingParameters(req) {
	const { title, description, body } = req.body;
	return !title || !description || !body;
}

module.exports.createArticle = async (req, res) => {
	if (missingParameters(req)) {
		res.status(400).send({ msg: 'Missing parameters' });
	}

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
