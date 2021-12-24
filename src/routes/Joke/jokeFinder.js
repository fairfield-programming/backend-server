const fs = require('fs');

// Get the Jokes as an Array
function getAllJokes() {

    // Get the File Data and Make it into an Array
    var fileData = fs.readFileSync('./jokes.txt');
    var arrayData = fileData.split('\n');

    // Return the Jokes
    return arrayData;

}

// Gets a Joke at an Index
function getJokeAtIndex(id) {

    // Get all of the Jokes
    var jokes = getAllJokes();
    var jokeCount = jokes.length;

    // Check if Id is out of Range
    if (typeof id != 'number') return false;
    if (id < 0) return false; 
    if (id >= jokeCount) return false;

    // Return the Joke
    return jokes[id];

}

// Get the Joke Count
function getJokeCount() {

    // Return the Count
    return getAllJokes().length;

}

// Get a Random Joke
function getRandomJoke() {

    // Get All of the Jokes
    var jokes = getAllJokes();
    var jokeIndex = Math.floor(Math.random() * jokes.length);

    // Return the Joke at the Index
    return jokes[jokeIndex];

}

module.exports = {
    getAllJokes,
    getJokeAtIndex,
    getJokeCount,
    getRandomJoke
};