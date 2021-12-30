module.exports = (req, res) => {
  if (req.user == undefined) return res.status(403).send("Not Logged In.");
  if (req.params.id || req.params.blockId == undefined)
    return res.status(400).send("Not All Parameters Provided.");

  User.findOne({
    where: {
      id: req.user.id,
    },
  })
    .then(function (userData) {
      User.findOne({
        where: {
          id: req.params.blockId,
        },
      })
        .then(function (blockData) {
          userData
            .addBlocked(blockData)
            .then(function (success) {
              return res.json(userData);
            })
            .catch(function () {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            });
        })
        .catch(function () {
          console.log(error);
          return res.status(500).send("Internal Server Error.");
        });
    })
    .catch(function () {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
