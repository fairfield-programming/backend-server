module.exports = (req, res) => {
  if (!req.user) return res.status(403).send("Not Logged In.");
  if (!req.params.id || !req.params.followerId) return res.status(400).send("Not All Parameters Provided.");

  User.findOne(
    {
      where:
      {
        id: req.user.id,
      },
    },
  )
    .then((followerData) => {
      User.findOne(
        {
          where:
          {
            id: req.params.followerId,
          },
        },
      )
        .then((followeeData) => {
          followeeData
            .addFollower(followerData)
            .then((success) => res.json(followeeData))
            .catch(() => {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            });
        })
        .catch(() => {
          console.log(error);
          return res.status(500).send("Internal Server Error.");
        });
    })
    .catch(() => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
