module.exports = (req, res) => {
  if (req.user == undefined) return res.status(403).send("Not Logged In.");
  if (req.params.id == undefined)
    return res.status(400).send("Not All Parameters Provided.");

  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(function (userData) {
      return userData.getFollowers();
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
