module.exports = (req, res) => {
    
    if (req.user == undefined) return res.status(403).send("Not Logged In.");

	console.log(req.user);

    User.findOne({
		where: {
			id: req.user.id
		}
	}).then(function (data) {
	
		if (data == null) return res.status(404).send("Not Found.")
		
		data.update({
			status: req.body.status,
		}).then(function (newData) {

			return res.status(200).send(newData.status);

		}).catch(function (error) {

			console.log(error);
			return res.status(500).send("Internal Server Error.")

		});
	
	}).catch(function (error) {
	
		console.log(error);
		return res.status(500).send("Internal Server Error.")
	
	})

};