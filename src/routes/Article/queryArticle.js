module.exports = (req, res) =>
{
    if (!req.params.id)
        return res.status(400).send("Not All Parameters Provided.");

    Article.findOne(
        {
            where:
            {
                id: req.params.id,
            },
        })
        .then(function(data)
        {
            if (!data) return res.status(404).send("Not Found.");

            return res.json(data);
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};