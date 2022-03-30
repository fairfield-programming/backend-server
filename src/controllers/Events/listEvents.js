
/**
 * @module List Events Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see all the current events, if any.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.listEvents = (req, res) => {
  Events.findAll(
    {},
  )
    .then((data) => {
      if (data.length <= 0) return res.status(404).send("Not Found.");

      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
