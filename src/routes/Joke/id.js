const jokeLib = require("./jokeFinder");
const { propertyUndefined } = require("../../library/validator");

module.exports = (req, res) =>
{
    // Set the Access-Control-Allow-Origin Header
    res.set("Access-Control-Allow-Origin", "*");

    // Check for ID
    if (propertyUndefined(req.params.id)) return res.status(400).send("ID Not Given.");

    // Make Sure ID is Correctly Formatted
    var numID = parseInt(req.params.id, 10);
    if (isNaN(numID)) return res.status(400).send("Poorly Formatted ID.");

    // Get the Joke
    var joke = jokeLib.getJokeAtIndex(numID);
    if (!joke) return res.status(404).send("Joke Not Found.");

    // Return the Joke
    return res.send(joke);
};