function handleError500(req, res, err) {
  res.status(500).send("Internal Server Error.");
  console.log(err);
}

module.exports = { handleError500 };
