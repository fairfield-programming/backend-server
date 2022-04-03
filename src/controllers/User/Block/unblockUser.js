const { handleError500 } = require('../../../library/errorHandler');

module.exports.unblockUser = (req, res) => {
	if (!req.user) res.status(403).send('Not Logged In.');
	if (!req.params.id || !req.params.blockId) res.status(400).send('Not All Parameters Provided.');
	else {
		User.findOne({
			where: {
				id: req.params.blockId,
			},
		})
			.then((blockData) => {
				User.findOne({
					where: {
						id: req.user.id,
					},
				})
					.then((userData) => {
						if (!userData.hasBlocked(blockData)) {
							res.status(401).send('You have not blocked this person');
						} else {
							blockData
								.removeBlocked(blockData)
								.then(() => res.json(userData))
								.catch((error) => handleError500(error));
						}
					})
					.catch((error) => handleError500(error));
			})
			.catch((error) => handleError500(error));
	}
};
