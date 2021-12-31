module.exports = (req, res) =>
{
    if (missingParameters(req))
        return res.status(400).send("Not All Parameters Provided.");

    Article.create(
        {
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
        })
        .then(function(data)
        {
            return res.json(data);
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};

function missingParameters(req) {
    const { title, description, body } = req.body;
    if ( !title || !description || !body ) return true;
    return false;
}