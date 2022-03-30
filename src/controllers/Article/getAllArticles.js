/**
 * @module Get All Articles Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see all the articles.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getAllArticles = (req, res) => {
    Article.findAll(
      {},
    )
      .then((data) => {
        if (data.length <= 0) return res.status(404).send("Not Found.");
        return res.json(data);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
      });
  };