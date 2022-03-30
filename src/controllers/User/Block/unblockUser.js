const { handleError500 } = require("../../../library/errorHandler");


/**
 * @module Block User Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to unblock a specific user, if already blocked and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.unblockUser = (req, res) => {
  if (!req.params.id || !req.params.blockId) res.status(400).send("Not All Parameters Provided.");
  else {
    User.findOne(
      {
        where:
        {
          id: req.params.blockId,
        },
      },
    )
      .then((blockData) => {
        User.findOne(
          {
            where:
            {
              id: req.user.id,
            },
          },
        )
          .then((userData) => {
            if (!userData.hasBlocked(blockData)) {
              res.status(401).send("You have not blocked this person");
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
