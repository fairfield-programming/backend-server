const jokeLib = require("./jokeFinder");
const { propertyUndefined } = require("../../library/validator");

/**
 * @module Get Joke By ID Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user get a specific joke by ID.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.getJokeById= (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (propertyUndefined(req.params.id)) return res.status(400).send("ID Not Given.");

    const numID = parseInt(req.params.id, 10);
    if (typeof numID !== "number") return res.status(400).send("Poorly Formatted ID.");

    const joke = jokeLib.getJokeAtIndex(numID);
    if (!joke) return res.status(404).send("Joke Not Found.");

    return res.send(joke);
};