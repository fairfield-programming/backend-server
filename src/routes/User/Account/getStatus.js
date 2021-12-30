const
{
    propertyUndefined,
    objectIsNull,
} = require("../../../library/validator");

module.exports = (req, res) =>
{
    if (propertyUndefined(req.params.id))
        return res.status(400).send("Not All Parameters Provided.");

    User.findOne(
        {
            where:
            {
                id: req.params.id,
            },
        })
        .then(function(data)
        {
            if (objectIsNull(data)) return res.status(404).send("Not Found.");

            res.set("Content-Type", "text/html");

            return res.send(data.status);
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};