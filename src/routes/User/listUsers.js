module.exports = (req, res) => {
  User.findAll({})
    .then(function (data) {
      if (data.length <= 0) return res.status(404).send("No Users.");

      var output = [];

      // Cleanup the Output
      data.forEach(function (element) {
        output.push({
          username: element.username,
          email: element.email,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        });
      });

      return res.json(output);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
