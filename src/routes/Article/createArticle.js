const { handleError500 } = require("../../library/errorHandler");

function missingParameters(req) {
  const { title, description, body } = req.body;
  return !title || !description || !body;
}

module.exports = (req, res) => {
  if (missingParameters(req)) res.status(400).send("Not All Parameters Provided.");
  else {
    Article.create(
      {
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
      },
    )
      .then((data) => res.json(data))
      .catch((error) => handleError500(req, res, error));
  }
};
