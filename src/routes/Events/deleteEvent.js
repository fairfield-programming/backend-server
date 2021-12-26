module.exports = (req, res) => {
    if (req.user == undefined) return res.status(403).send("Not Logged In.");
    if (req.params.id == undefined) return res.status(400).send("Not All Parameters Provided.")

    Events.findOne({
        where: {
            id:req.params.id
        }
    }).then(function(eventData){
        User.findAll({
            where: {
                events : eventData
            }
        }).then(function(userData){
            userData.removeEvents(eventData).then(function (success){
                eventData.destroy().then(function () {

                    return res.status(200).send("Success.");
    
                }).catch(function (error) {
    
                    console.log(error);
                    return res.status(500).send("Internal Server Error.")
    
                });
            }).catch(function () {

                console.log(error)
                return res.status(500).send("Internal Server Error.")

            });
            
        }).catch(function () {

            console.log(error)
            return res.status(500).send("Internal Server Error.")

        });
    }).catch(function () {

        console.log(error)
        return res.status(500).send("Internal Server Error.")

    });
}