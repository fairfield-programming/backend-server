const duckGenerator = require("./duckGenerator");
const {getData} = require("../../library/duckStringParser")

module.exports = (req, res) =>
{
    // Get the Zoom
    const zoom = req.params.zoom;
    const zoomInt = parseInt(zoom);

    // Parse the String
    const duckData = getData(req.params.id);
    if (!duckData) return res.status(400).send("Bad Request.");

    // Set the Headers
    res.set("Content-Type", "image/svg+xml");

    // Send the Duck
    return res.send(
        duckGenerator.formatSVG(duckGenerator.generateDuck(duckData), zoomInt)
    );
};