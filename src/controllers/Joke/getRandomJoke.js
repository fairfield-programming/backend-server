const jokeLib = require("./jokeFinder");

module.exports.getRandomJoke = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    return res.send(jokeLib.getRandomJoke());
};
