const path = require('path');
const { readFileSync } = require('fs');
const { checkIfNumberInRange } = require('../../library/validator');

// Get the Jokes as an Array
function getAllJokes() {
	return readFileSync(path.join(__dirname, '/jokes.txt'), 'ascii').split('\n');
}

function getJokeAtIndex(id) {
	// Get all of the Jokes
	const jokes = getAllJokes();
	const jokeCount = jokes.length;

	// Check if Id is out of Range
	if (typeof id != 'number') {
		return false;
	}

	if (!checkIfNumberInRange(id, 0, jokeCount)) {
		return false;
	}

	return jokes[id];
}

function getJokeCount() {
	// Return the Count
	return getAllJokes().length;
}

function getRandomJoke() {
	// Get All of the Jokes
	const jokes = getAllJokes();
	const jokeIndex = Math.floor(Math.random() * jokes.length);

	// Return the Joke at the Index
	return jokes[jokeIndex];
}

module.exports = {
	getAllJokes,
	getJokeAtIndex,
	getJokeCount,
	getRandomJoke,
};
