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
