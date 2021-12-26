const Events = require("../../models/Events");

module.exports = (req, res) => {
    
    if (req.user == undefined) return res.status(403).send("Not Logged In.");

    Events.findOne({
        where: {
            id:req.params.id
        }
    }).then(function (eventData) {

        User.findOne({
            where: {
                id:req.user.id
            }
        }).then(function (userData) {
    
            userData.addEvents(eventData)
            return json(userData)
    
        }).catch(function (error) {
            
            console.log(error)
            return res.status(500).send("Internal Server Error.")

        })

    }).catch(function (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error.")

    })
    
}