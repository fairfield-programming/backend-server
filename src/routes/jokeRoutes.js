const express = require("express");
const router = express.Router();
const jokeControllers = require("../controllers/Joke");

router.get('/', jokeControllers.getAllJokes);
router.get('/count', jokeControllers.getJokeCount);
router.get('/random', jokeControllers.getRandomJoke);
router.get('/:id', jokeControllers.getJokeById);


module.exports = router;


