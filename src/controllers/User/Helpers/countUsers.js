module.exports.countUsers = (req, res) => {
	User.findAll({})
		.then((data) => {
			return res.json({ count: data.length });
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
