const jokeLib = require("./jokeFinder");

module.exports.get_joke_count = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    return res.send(jokeLib.getJokeCount().toString());
};