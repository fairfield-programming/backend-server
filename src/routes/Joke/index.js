module.exports = (req, res) => {

    // Create an Array of Jokes
    var jokes = [
        "What's a duck's favorite ballet? The Nutquacker.",
        "What's a duck's favorite part of the news? The feather forecast.",
        "Why did the duck go to the chiropractor? To get its back quacked.",
        "Where do ducks go when they're sick? The ducktor's office.",
        "Why do ducks never grow up? Because they grown down.",
        "What do ducks have with their soup? Quackers.",
        "What do you call a duck that breaks into people's houses? A robber ducky.",
        "What are duck's favorite zoo animal? Quackodiles."
    ];

    // Pick a Joke to Send
    var jokeIndex = Math.floor(Math.random() * jokes.length);
    var joke = jokes[jokeIndex];

    // Return the Joke 
    return res.send(joke);

}