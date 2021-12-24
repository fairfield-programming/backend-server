const jokeLib = require('./jokeFinder');

module.exports = (req, res) => {

    // Check for ID
    if (req.params.id == undefined) return res.status(400).send("ID Not Given.");

    // Make Sure ID is Correctly Formatted
    var numID = parseInt(req.params.id, 10);
    if (isNaN(numID)) return res.status(400).send("Poorly Formatted ID.");

    // Return the Joke
    return res.send(jokeLib.getJokeAtIndex(numID));

}