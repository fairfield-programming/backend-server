const jokeLib = require('./jokeFinder');

module.exports = (req, res) => {

    return jokeLib.getRandomJoke();

}