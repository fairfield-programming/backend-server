const
{
    propertyUndefined
} = require("../../library/validator");

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
            if (data == null) return res.status(404).send("Not Found.");

            return res.json(
            {
                username: data.username,
                email: data.email,
                profilePicture: data.profilePicture,
                biography: data.biography,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            });
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};