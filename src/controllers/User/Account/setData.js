const vulgarTester = require("../../../library/VulgarTest");

/**
 * @module Set Account Data Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to update his account data, if no vulgar language detected and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.setData = (req, res) => {

  const { biography, profilePicture, username } = req.body;
  if (!biography || !profilePicture || !username) return res.status(400).send("Not All Parameters Given.");

  User.findOne(
    {
      where:
      {
        id: req.user.id,
      },
    },
  )
    .then((data) => {
      if (!data) return res.status(404).send("Not Found.");

      if (vulgarTester.DetectVulgarWords(req.body.biography)) return res.status(406).send("Vulgar Language Detected.");
      if (vulgarTester.DetectVulgarWords(req.body.username)) return res.status(406).send("Vulgar Language Detected.");

      data
        .update(
          {
            biography: req.body.biography || data.biography,
            profilePicture: req.body.profilePicture || data.profilePicture,
            username: req.body.username || data.username,
          },
        )
        .then((newData) => res.status(200).json(
          {
            id: newData.id,
            username: newData.username,
            biography: newData.biography,
            profilePicture: newData.profilePicture,
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
};