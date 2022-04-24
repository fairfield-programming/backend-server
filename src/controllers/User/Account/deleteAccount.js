const { compare } = require('bcrypt');
const { handleError500 } = require('../../../library/errorHandler');


/**
 * @module Delete Account Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to delete his account.
 * If all goes well,  redirect to "/"  ( root ) .
 * Otherwise, send back an error message.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.deleteAccount = (req, res) => {
<<<<<<< HEAD
  if (!req.params.id) res.status(400).send("Not All Parameters Given.");
  else if (req.user.id !== req.params.id) res.status(401).send("Not Authorized.");
  else {
    User.findOne(
      {
        where:
        {
          id: req.params.id,
        },
      },
    )
      .then((userData) => {
        if (!userData) res.status(404).send("User Not Found.");
        else {
          compare(
            req.body.password,
            userData.password,
            (err, result) => {
              if (err) handleError500(err);
              else if (!result) res.status(403).send("Invalid Credentials.");
              else {
                userData
                  .destroy()
                  .then(() => res.status(200).redirect("/"))
                  .catch((error) => handleError500(error));
              }
            },
          );
        }
      })
      .catch((error) => handleError500(error));
  }
=======
	if (!req.params.id) res.status(400).send('Not All Parameters Given.');
	else if (!req.user) res.status(403).send('Not Logged In.');
	else if (req.user.id !== req.params.id) res.status(401).send('Not Authorized.');
	else {
		User.findOne({
			where: {
				id: req.params.id,
			},
		})
			.then((userData) => {
				if (!userData) res.status(404).send('User Not Found.');
				else {
					compare(req.body.password, userData.password, (err, result) => {
						if (err) handleError500(err);
						else if (!result) res.status(403).send('Incorrect Password.');
						else {
							userData
								.destroy()
								.then(() => res.status(200).send('Success.'))
								.catch((error) => handleError500(error));
						}
					});
				}
			})
			.catch((error) => handleError500(error));
	}
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5
};
