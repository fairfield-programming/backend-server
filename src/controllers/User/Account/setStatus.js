const vulgarTester = require('../../../library/VulgarTest');
const { handleError500 } = require('../../../library/errorHandler');


/**
 * @module Set Account Status Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to update his account status, if no vulgar language detected and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.setStatus = (req, res) => {
<<<<<<< HEAD
  User.findOne(
    {
      where:
      {
        id: req.user.id,
      },
    },
  )
    .then((data) => {
      if (!data) res.status(404).send("Not Found.");
      else if (!req.body.status) {
        if (vulgarTester.DetectVulgarWords(req.body.status)) res.status(406).send("Vulgar Language Detected.");
      } else {
        data
          .update(
            {
              status: req.body.status,
            },
          )
          .then((newData) => res.status(200).send(newData.status))
          .catch((error) => handleError500(error));
      }
    })
    .catch((error) => handleError500(error));
=======
	if (!req.user) res.status(403).send('Not Logged In.');
	else {
		User.findOne({
			where: {
				id: req.user.id,
			},
		})
			.then((data) => {
				if (!data) res.status(404).send('Not Found.');
				else if (!req.body.status) {
					if (vulgarTester.detectVulgarWords(req.body.status)) res.status(406).send('Vulgar Language Detected.');
				} else {
					data
						.update({
							status: req.body.status,
						})
						.then((newData) => res.status(200).send(newData.status))
						.catch((error) => handleError500(error));
				}
			})
			.catch((error) => handleError500(error));
	}
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5
};
