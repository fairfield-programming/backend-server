const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

/**
<<<<<<< HEAD
 * @module LOGIN
 * 
 * 
 * @param {Request} req - HTTP POST Request on "/user/login" 
 * @param {Response} res - HTTP Response 
=======
 * @module login
 * HTTP POST Request on "/login" handler
 * @param {Request} req - HTTP POST Request on "/login"
 * @param {Response} res - HTTP Response
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5
 * @returns {Response}  HTTP Response
 * @description This route handler will listen to the client request,
 * check if all parameter are good, look if there is a user in the database with the passed credentials
 * then if all goes well, send back a cookie to the client.
 */
module.exports.login = (req, res) => {
<<<<<<< HEAD
  if ((!req.body.email && !req.body.username) || !req.body.password) return res.status(400).send("Not All Parameters Given.");

  User.findOne({
      where:{
        [Op.or]: [
          {
            username: req.body.username || "",
          },
          {
            email: req.body.email || "",
          }],
      },
  }).then((userData) => {

      if (!userData) return res.status(404).send("Account Not Found.");

      compare(req.body.password, userData.password, (err, result) => {

          if (!result) return res.status(403).send("Invalid Credentials.");

          if (err) {
            return res.status(500).send("Internal Server Error.");
          }

          // In order to support an open-api and multiple platforms, cookies cant be used.
          // User sessions will need to be stored on the client side.

          res.json({ 
            token: sign(
              {
                id: userData.id,
                username: userData.username,
                email: userData.email,
              },
              process.env.JWT_KEY,
            ),
            id: userData.id
         });

        }
      );
    })
    .catch((error) => {
      return res.status(500).send("Internal Server Error.");
    });
=======
	if ((!req.body.email && !req.body.username) || !req.body.password)
		return res.status(400).send('Not All Parameters Given.');

	User.findOne({
		where: {
			[Op.or]: [
				{
					username: req.body.username || '',
				},
				{
					email: req.body.email || '',
				},
			],
		},
	})
		.then((userData) => {
			if (!userData) return res.status(404).send('Account Not Found.');

			compare(req.body.password, userData.password, (err, result) => {
				if (!result) return res.status(403).send('Invalid Credentials.');

				if (err) {
					return res.status(500).send('Internal Server Error.');
				}

				// In order to support an open-api and multiple platforms, cookies cant be used.
				// User sessions will need to be stored on the client side.

				res.json({
					token: sign(
						{
							id: userData.id,
							username: userData.username,
							email: userData.email,
						},
						process.env.JWT_KEY,
					),
				});
			});
		})
		.catch((error) => {
			return res.status(500).send('Internal Server Error.');
		});
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5
};
