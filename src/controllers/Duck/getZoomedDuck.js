const duckGenerator = require("duckgen");

/**
 * @module Get Duck Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to receive a zoomed version of a specific duck svg.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.getZoomedDuck = (req, res) => {
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
