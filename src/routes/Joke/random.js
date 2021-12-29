const jokeLib = require("./jokeFinder");

module.exports = (req, res) =>
{
    // Set the Access-Control-Allow-Origin Header
    res.set("Access-Control-Allow-Origin", "*");

    // Return the Joke
    return res.send(jokeLib.getRandomJoke());
};