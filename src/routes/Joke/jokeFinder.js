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



}

module.exports = {
    getAllJokes
};