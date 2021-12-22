duckGenerator = require('./duckGenerator');

module.exports = (req, res) => {

    // Set the Headers
    res.set("Content-Type", "image/svg+xml");

    // Parse the String
    var duckData = duckGenerator.parseDuckString(req.params.id);
    if (duckData == false) return res.status(400).send("Bad Request.");
    
    // Send the Duck
    return res.send(
        duckGenerator.formatSVG(
            duckGenerator.generateDuck(duckData)
        )
    );

}