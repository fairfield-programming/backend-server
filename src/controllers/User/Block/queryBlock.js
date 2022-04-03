module.exports.queryBlock = (req, res) => {
	if (!req.params.id || !req.params.blockId) return res.status(400).send('Not All Parameters Provided.');
	if (!req.user) return res.status(403).send('Not Logged In');

	User.findOne({
		where: {
			id: req.params.blockId,
		},
	})
		.then((blockData) => {
			if (!blockData) return res.status(404).send('Not Found.');

			User.findOne({
				where: {
					id: req.user.id,
				},
			})
				.then((userData) => {
					if (!userData.hasBlocked(blockData)) {
						return res.status(401).send('You have not blocked this person');
					}

					return res.json(blockData);
				})
				.catch((error) => {
					console.log(error);
					return res.status(500).send('Internal Server Error.');
				});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
