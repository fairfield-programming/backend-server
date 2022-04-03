module.exports.listUsers = (req, res) => {
	User.findAll({})
		.then((data) => {
			if (data.length <= 0) return res.status(404).send('No Users.');

			const output = [];

			// Cleanup the Output
			data.forEach((element) => {
				output.push({
					username: element.username,
					email: element.email,
					createdAt: element.createdAt,
					updatedAt: element.updatedAt,
				});
			});

			return res.json(output);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
