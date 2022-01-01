const vulgarTester = require("../../../library/VulgarTest");

module.exports = (req, res) => {
  if (!req.user) return res.status(403).send("Not Logged In.");

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

      if (!req.body.status) if (vulgarTester.DetectVulgarWords(req.body.status)) return res.status(406).send("Vulgar Language Detected.");

      data
        .update(
          {
            status: req.body.status,
          },
        )
        .then((newData) => res.status(200).send(newData.status))
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
