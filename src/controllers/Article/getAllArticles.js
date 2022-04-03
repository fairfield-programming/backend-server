module.exports.getAllArticles = async (req, res) => {
	try {
		const articles = await Article.findAll({});

		if (!articles?.length) {
			return res.status(404).send({ msg: 'No articles found' });
		}

		return res.json({ articles });
	} catch (e) {
		return res.status(500).send({ msg: 'Server error' });
	}
};
