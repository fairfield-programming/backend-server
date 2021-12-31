const jokeLib = require("./jokeFinder");

module.exports = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (!req.params.id) return res.status(400).send("ID Not Given.");

  const numID = parseInt(req.params.id, 10);
  if (typeof numID !== "number") return res.status(400).send("Poorly Formatted ID.");

  const joke = jokeLib.getJokeAtIndex(numID);
  if (!joke) return res.status(404).send("Joke Not Found.");

  return res.send(joke);
};
