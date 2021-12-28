const Events = require("../../models/Events");

module.exports = (req, res) => {

    if (req.user == undefined) return res.status(403).send("Not Logged In.");
    if (req.body.name == undefined || req.body.location == undefined || req.body.description == undefined || req.body.host == undefined || req.body.status == undefined  || req.body.date == undefined) return res.status(400).send("Not All Parameters Provided.")

    Events.findOne({
        where: {id:req.params.id}
    }).then(function(eventData){
        if (eventData.ownerId != req.user.id){
            return res.status(401).send('Not Authorized to Edit')
        }

        if (req.body.status != undefined)
			if (vulgarTester.DetectVulgarWords(req.body.status))
				return res.status(406).send("Vulgar Language Detected.");
        
        eventData.update({
			name: req.body.name,
		    location: req.body.location,
		    description: req.body.description,
            host: req.body.host,
            status: req.body.status,
            date: req.body.date
		}).then(function (newData) {

			return res.status(200).send(newData.status);

		}).catch(function (error) {

			console.log(error);
			return res.status(500).send("Internal Server Error.")

		})

    }).catch(function (error){
        console.log(error);
		return res.status(500).send("Internal Server Error.")
    })

}