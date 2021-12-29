module.exports = (req, res) =>
{
    if (req.user == undefined) return res.status(403).send("Not Logged In.");
    if (req.params.id == undefined)
        return res.status(400).send("Not All Parameters Provided.");

    User.findOne(
        {
            where:
            {
                id: req.user.id,
            },
        })
        .then(function(followerData)
        {
            User.findOne(
                {
                    where:
                    {
                        id: req.params.followerId,
                    },
                })
                .then(function(followeeData)
                {
                    followeeData
                        .addFollower(followerData)
                        .then(function(success)
                        {
                            return res.json(followeeData);
                        })
                        .catch(function()
                        {
                            console.log(error);
                            return res.status(500).send("Internal Server Error.");
                        });
                })
                .catch(function()
                {
                    console.log(error);
                    return res.status(500).send("Internal Server Error.");
                });
        })
        .catch(function()
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};