/**
 * @module Query Article Controller
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to see the details of a specific article.
 * 
 * @todo
 * Nothing for now.
 * 
 */

module.exports.queryArticle = (req, res) => {
    if (!req.params.id) return res.status(400).send("Not All Parameters Provided.");
  
    Article.findOne(
      {
        where:
        {
          id: req.params.id,
        },
      },
    ).then((data) => {
      if (!data) return res.status(404).send("Not Found.");
  
      return res.json(data);
    })
      .catch((error) => {
        console.log(error);
        return res.status(500).send("Internal Server Error.");
      });
  };
  