
/**
 * @module List Blocked Users Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see the his blocked users list, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.listBlocked = (req, res) => {
<<<<<<< HEAD
    if (!req.params.id || !req.params.blockId) return res.status(400).send("Not All Parameters Provided.");
  
    User.findOne(
      {
        where:
        {
          id: req.params.id,
        },
      },
    )
      .then((userData) => userData.getBlocked())
      .catch((error) => {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
      });
  };
  
=======
	if (!req.user) return res.status(403).send('Not Logged In.');
	if (!req.params.id || !req.params.blockId) return res.status(400).send('Not All Parameters Provided.');

	User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((userData) => userData.getBlocked())
		.catch((error) => {
			console.log(error);
			return res.status(500).send('Internal Server Error.');
		});
};
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5
