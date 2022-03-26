const duckGenerator = require("duckgen");

module.exports = (req, res) => {
  res.set("Content-Type", "image/svg+xml");
  res.send(duckGenerator.formatSVG(duckGenerator.generateDuck(
    {},
  )));
};

