const jokeLib = require('./jokeFinder');

module.exports = (req, res) => {

    return res.send(jokeLib.getJokeCount().toString());

}