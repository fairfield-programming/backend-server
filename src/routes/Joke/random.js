module.exports = (req, res) => {

    // Create an Array of Jokes
    var jokes = [
        
    ];

    // Pick a Joke to Send
    var jokeIndex = Math.floor(Math.random() * jokes.length);
    var joke = jokes[jokeIndex];

    // Return the Joke 
    return res.send(joke);

}