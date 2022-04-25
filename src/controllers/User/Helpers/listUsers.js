
/**
 * @module Get Users Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get the registred users list.
 * 
 * @todo
 * Nothing for now.
 */
module.exports.listUsers = (req, res) => {
	User.findAll({})
		.then((data) => {
			if (data.length <= 0) return res.status(404).send("No Users.");

			const output = [];

			// Cleanup the Output
			data.forEach((element) => {
				output.push(
					{
						id: element.id,
						username: element.username,
						email: element.email,
						createdAt: element.createdAt,
						updatedAt: element.updatedAt,
					},
				);
			});

			return res.json(output);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
