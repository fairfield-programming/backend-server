
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
  
