const duckGenerator = require("duckgen");

/**
 * @module Get Duck Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to receive a duck svg.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getDuck = (req, res) => {
  res.set("Content-Type", "image/svg+xml");
  res.send(duckGenerator.formatSVG(duckGenerator.generateDuck(
    {},
  )));
};

