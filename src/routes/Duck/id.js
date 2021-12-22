duckGenerator = require('./duckGenerator');

module.exports = (req, res) => {

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