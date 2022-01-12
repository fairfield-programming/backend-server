const duckGenerator = require("duckgen");

module.exports = (req, res) => {
  // Parse the String
  const duckData = duckGenerator.parseV1String(req.params.id);
  if (!duckData) res.status(400).send("Bad Request.");
  else {
    const zoomInt = parseInt(req.params.zoom);
    res.set("Content-Type", "image/svg+xml");

    res.send(
      duckGenerator.formatSVG(duckGenerator.generateDuck(duckData), zoomInt),
    );
  }
};
