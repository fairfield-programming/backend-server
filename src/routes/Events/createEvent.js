module.exports = (req, res) => {

	if (req.user == undefined) return res.status(400).send("Not Logged In.")
	if (req.body.name == undefined || req.body.location == undefined || req.body.description == undefined || req.body.host == undefined || req.body.status == undefined  || req.body.date == undefined) return res.status(400).send("Not All Parameters Provided.")
	
	Events.create({
		name: req.body.name,
		location: req.body.location,
		description: req.body.description,
        host: req.body.host,
        status: req.body.status,
        date: req.body.date
	}).then(function (data) {
	
		return res.json(data)
	
	}).catch(function (error) {
	
		console.log(error);
		return res.status(500).send("Internal Server Error.")
	
	})

}