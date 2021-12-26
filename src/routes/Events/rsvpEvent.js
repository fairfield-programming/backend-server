const Events = require("../../models/Events");

module.exports = (req, res) => {
    if (req.user == undefined) return res.status(403).send("Not Logged In.");

    const eventData = Events.findOne({
        where: {
            id:req.params.id
        }
    }).catch(function (error){
        console.log(error)
        return res.status(500).send("Internal Server Error.")
    })

    const userData = User.findOne({
        where: {
            id:req.user.id
        }
    }).catch(function (error){
        console.log(error)
        return res.status(500).send("Internal Server Error.")
    })
    
    userData.addEvents(eventData)
    return json(userData)
}