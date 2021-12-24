module.exports = (req, res) => {

    // Create an Array of Jokes
    var jokes = [
        "What's a duck's favorite ballet? The Nutquacker.",
        ""
    ];

    // Pick a Joke to Send
    var jokeIndex = Math.floor(Math.random() * jokes.length);
    var joke = jokes[jokeIndex];

    // Return the Joke 
    return res.send(joke);

}