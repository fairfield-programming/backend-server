const duckGenerator = require("duckgen");

module.exports= (req, res) => {
    const duckData = duckGenerator.parseV1String(req.params.id);
    if (!duckData) return res.status(400).send("Bad Request.");
  
    res.set("Content-Type", "image/svg+xml");
  
    return res.send(
      duckGenerator.formatSVG(duckGenerator.generateDuck(duckData)),
    );
  };