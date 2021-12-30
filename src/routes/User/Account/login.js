module.exports = (req, res) =>
{
    // Check That All Parameters Are Given
    if (noEmailAndUsername(req))
        return res.status(400).send("Not All Parameters Given.");
    
    if (!req.body.password)
        return res.status(400).send("Not All Parameters Given.");

    User.findOne(
        {
            where:
            {
                [Op.or]: [
                {
                    username: req.body.username || "",
                },
                {
                    email: req.body.email || "",
                }, ],
            },
        })
        .then(function(userData)
        {
            if (!userData) return res.status(404).send("Account Not Found.");

            bcrypt.compare(
                req.body.password,
                userData.password,
                function(err, result)
                {
                    if (!result) return res.status(403).send("Incorrect Password.");

                    if (err)
                    {
                        console.log(err);
                        return res.status(500).send("Internal Server Error.");
                    }

                    return res.json(
                    {
                        token: jwt.sign(
                            {
                                id: userData.id,
                                username: userData.username,
                                email: userData.email,
                            },
                            process.env.JWT_KEY
                        ),
                    });
                }
            );
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};

function noEmailAndUsername(req) {
    if (!req.body.email && !req.body.username) return true;
    return false;
}