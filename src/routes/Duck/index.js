const duckGenerator = require('./duckGenerator');

module.exports = (req, res) => {

    // Set the Headers
    res.set("Content-Type", "image/svg+xml");

    // Send the Duck
    res.send(
        duckGenerator.formatSVG(
            duckGenerator.generateDuck({})
        )
    );

}