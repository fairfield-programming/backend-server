duckGenerator = require('./duckGenerator');

module.exports = (req, res) => {

    res.send(
        duckGenerator.formatSVG(
            duckGenerator.generateDuck({})
        )
    );

}