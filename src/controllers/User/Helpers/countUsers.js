
/**
 * @module Get Users Count Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to get the users count.
 * 
 * @todo
 * Nothing for now.
 */
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
