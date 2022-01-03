const { getData } = require("../../library/duckStringParser");
const duckGenerator = require("./duckGenerator");

module.exports = (req, res) => {
  const duckData = getData(req.params.id);
  if (!duckData) return res.status(400).send("Bad Request.");

  res.set("Content-Type", "image/svg+xml");

  return res.send(
    duckGenerator.formatSVG(duckGenerator.generateDuck(duckData)),
  );
};
