
/**
 * @module Delete Event Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to delete an event of his own, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.deleteEvent = (req, res) => {
  if (!req.params.id) return res.status(400).send("Not All Parameters Provided.");

  Events.findOne(
    {
      where:
      {
        id: req.params.id,
      },
    },
  )
    .then((eventData) => {
      if (eventData.ownerId !== req.user.id) {
        return res.status(401).send("Not Authorized to Delete");
      }
      User.findAll(
        {
          where:
          {
            events: eventData,
          },
        },
      )
        .then((userData) => {
          userData
            .removeEvents(eventData)
            .then(() => {
              eventData
                .destroy()
                .then(() => res.status(200).send("Success.")).catch((error) => {
                  console.log(error);
                  return res.status(500).send("Internal Server Error.");
                });
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send("Internal Server Error.");
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
