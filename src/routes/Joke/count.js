const jokeLib = require("./jokeFinder");

module.exports = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  return res.send(jokeLib.getJokeCount().toString());
};
