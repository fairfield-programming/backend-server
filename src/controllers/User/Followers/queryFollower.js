
/**
 * @module Query Follower Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see a specific follower, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.queryFollower = (req, res) => {
<<<<<<< HEAD
  if (!req.params.id || !req.params.followerId) return res.status(400).send("Not All Parameters Provided.");
=======
	if (!req.params.id || !req.params.followerId) return res.status(400).send('Not All Parameters Provided.');
	if (!req.user) return res.status(403).send('Not Logged In');
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5

	User.findOne({
		where: {
			id: req.params.followerId,
		},
	})
		.then((followerData) => {
			if (!data) return res.status(404).send('Not Found.');

			User.findOne({
				where: {
					id: req.params.id,
				},
			})
				.then((followeeData) => {
					if (!followeeData.hasFollower(followerData)) {
						return res.status(401).send('You do not follow this person');
					}

					return res.json(followerData);
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
