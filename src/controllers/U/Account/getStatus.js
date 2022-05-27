/**
 * @module Get Account Status Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user get the status of a registred user, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getStatus = (req, res) => {
  if (!req.params.username) return res.status(400).send("Not All Parameters Provided.");

  User.findOne(
    {
      where:
      {
        username: req.params.username,
      },
    },
  )
    .then((data) => {
      if (!data) return res.status(404).send("Not Found.");

      res.set("Content-Type", "text/html");

      return res.send(data.status);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
