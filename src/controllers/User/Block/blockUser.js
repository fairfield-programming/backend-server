
/**
 * @module Block User Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to block a specific user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */



module.exports.blockUser = (req, res) => {
  if (!req.params.id || !req.params.blockId) return res.status(400).send("Not All Parameters Provided.");

	User.findOne({
		where: {
			id: req.user.id,
		},
	})
		.then((userData) => {
			User.findOne({
				where: {
					id: req.params.blockId,
				},
			})
				.then((blockData) => {
					userData
						.addBlocked(blockData)
						.then(() => res.json(userData))
						.catch((error) => {
							console.log(error);
							return res.status(500).send('Internal Server Error.');
						});
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
