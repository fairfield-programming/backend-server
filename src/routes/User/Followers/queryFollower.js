module.exports = (req, res) =>
{
    if (req.params.id || req.params.followerId == undefined)
        return res.status(400).send("Not All Parameters Provided.");
    if (req.user == undefined) return res.status(403).send("Not Logged In");

    User.findOne(
        {
            where:
            {
                id: req.params.followerId,
            },
        })
        .then(function(followerData)
        {
            if (data == null) return res.status(404).send("Not Found.");

            User.findOne(
                {
                    where:
                    {
                        id: req.params.id,
                    },
                })
                .then(function(followeeData)
                {
                    if (!followeeData.hasFollower(followerData))
                    {
                        return res.status(401).send("You do not follow this person");
                    }

                    return res.json(followerData);
                })
                .catch(function(error)
                {
                    console.log(error);
                    return res.status(500).send("Internal Server Error.");
                });
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};