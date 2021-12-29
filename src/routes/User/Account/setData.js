const vulgarTester = require("../../../library/VulgarTest");
const
{
    notEnoughParametersForSetData
} = require("./utils");

module.exports = (req, res) =>
{
    if (req.user == undefined) return res.status(403).send("Not Logged In.");

    if (notEnoughParametersForSetData(req))
        return res.status(400).send("Not All Parameters Given.");

    User.findOne(
        {
            where:
            {
                id: req.user.id,
            },
        })
        .then(function(data)
        {
            if (data == null) return res.status(404).send("Not Found.");

            if (vulgarWordsFound(req))
                return res.status(406).send("Vulgar Language Detected.");

            data
                .update(
                {
                    biography: req.body.biography || data.biography,
                    profilePicture: req.body.profilePicture || data.profilePicture,
                    username: req.body.username || data.username,
                })
                .then(function(newData)
                {
                    return res.status(200).json(
                    {
                        id: newData.id,
                        username: newData.username,
                        biography: newData.biography,
                        profilePicture: newData.profilePicture,
                    });
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

function vulgarWordsFound(req)
{
    if (vulgarTester.DetectVulgarWords(req.body.biography)) return true;
    if (vulgarTester.DetectVulgarWords(req.body.username)) return true;
    return false;
}