module.exports = (req, res) =>
{
    Article.findAll(
        {})
        .then(function(data)
        {
            if (data.length <= 0) return res.status(404).send("Not Found.");

            return res.json(data);
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};