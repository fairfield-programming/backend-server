module.exports = (req, res) => {
  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.body == undefined
  )
    return res.status(400).send("Not All Parameters Provided.");

  Article.create({
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
  })
    .then(function (data) {
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
