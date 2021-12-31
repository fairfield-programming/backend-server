const {getData} = require("../../library/duckStringParser")
const duckGenerator = require("./duckGenerator");

module.exports = (req, res) =>
{
    // Parse the String
    const duckData = getData(req.params.id);
    if (!duckData) return res.status(400).send("Bad Request.");

    // Set the Headers
    res.set("Content-Type", "image/svg+xml");

    // Send the Duck
    return res.send(
        duckGenerator.formatSVG(duckGenerator.generateDuck(duckData))
    );
};