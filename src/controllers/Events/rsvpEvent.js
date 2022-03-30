const Events = require("../../models/Events");


/**
 * @module RSVP Events Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to subscribe to an event, if all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */



module.exports.rsvpEvent = (req, res) => {
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
      User.findOne(
        {
          where:
          {
            id: req.user.id,
          },
        },
      )
        .then((userData) => {
          userData
            .addEvents(eventData)
            .then(() => res.json(
              {
                name: eventData.name,
                location: eventData.location,
                description: eventData.description,
                host: eventData.host,
                eventImage: eventData.eventImage,
                status: eventData.status,
                date: eventData.date,
              },
            ))
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