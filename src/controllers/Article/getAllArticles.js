module.exports.getAllArticles = (req, res) => {
	Article.findAll({})
		.then((data) => {
			if (data.length <= 0) return res.status(404).send('Not Found.');
			return res.json(data);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
