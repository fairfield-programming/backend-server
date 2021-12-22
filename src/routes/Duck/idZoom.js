duckGenerator = require('./duckGenerator');

module.exports = (req, res) => {

    // Set the Headers
    res.set("Content-Type", "image/svg+xml");
    
    // Get the Zoom
    var zoom = req.params.zoom;
    var zoomInt = parseInt(zoom);

    // Parse the String
    var duckData = duckGenerator.parseDuckString(req.params.id);
    if (duckData == false) return res.status(400).send("Bad Request.");
    
    // Send the Duck
    return res.send(
        duckGenerator.formatSVG(
            duckGenerator.generateDuck(duckData),
            zoomInt
        )
    );

}