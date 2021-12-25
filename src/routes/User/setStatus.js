module.exports = (req, res) => {
    
    if (req.auth == undefined) return res.status(403).send("Not Logged In.");

    return res.status(200).send("Success.");

};