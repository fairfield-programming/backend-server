const vulgarTester = require("../../../library/VulgarTest");

module.exports.setData = (req, res) => {
  if (!req.user) return res.status(403).send("Not Logged In.");

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
