const jokeLib = require('./jokeFinder');

module.exports = (req, res) => {

    return res.json(jokeLib.getAllJokes());

}