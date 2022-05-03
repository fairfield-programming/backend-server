
/**
 * @module Query User Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get a specific user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.queryUser = (req, res) => {
	if (!req.params.id) return res.status(400).send('Not All Parameters Provided.');

	User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((data) => {
			if (!data) return res.status(404).send('Not Found.');

			return res.json({
				username: data.username,
				email: data.email,
				profilePicture: data.profilePicture,
				biography: data.biography,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
