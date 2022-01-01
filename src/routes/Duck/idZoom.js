const duckGenerator = require("./duckGenerator");
const { getData } = require("../../library/duckStringParser");

module.exports = (req, res) => {
  // Parse the String
  const duckData = getData(req.params.id);
  if (!duckData) res.status(400).send("Bad Request.");
  else {
    const zoomInt = parseInt(req.params.zoom);
    res.set("Content-Type", "image/svg+xml");

    // Send the Duck
    res.send(
      duckGenerator.formatSVG(duckGenerator.generateDuck(duckData), zoomInt),
    );
  }
};
