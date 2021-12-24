const jokeLib = require('./jokeFinder');

module.exports = (req, res) => {

    // Set the Access-Control-Allow-Origin Header
    res.set('Access-Control-Allow-Origin', '*');
    
    // Check for ID
    if (req.params.id == undefined) return res.status(400).send("ID Not Given.");

    // Make Sure ID is Correctly Formatted
    var numID = parseInt(req.params.id, 10);
    if (isNaN(numID)) return res.status(400).send("Poorly Formatted ID.");

    // Get the Joke
    var joke = jokeLib.getJokeAtIndex(numID);
    if (joke == false) return res.status(404).send("Joke Not Found.");

    // Return the Joke
    return res.send(joke);

}