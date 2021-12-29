module.exports = (req, res) => {
	if (req.params.id == undefined) return res.status(400).send("Not All Parameters Given.");
	if (req.user == undefined) return res.status(403).send("Not Logged In.");
	if (req.user.id != req.params.id) return res.status(401).send("Not Authorized.");

    User.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (userData) {

		if (userData == null) return res.status(404).send("User Not Found.");

		bcrypt.compare(req.body.password, userData.password, function (err, result) {

		if (err) {
			console.log(err) 
			return res.status(500).send("Internal Server Error.")
		}

		if (!result) return res.status(403).send("Incorrect Password.")
            
			userData.destroy().then(function () {

				return res.status(200).send("Success.");

			}).catch(function (error) {

				console.log(error);
				return res.status(500).send("Internal Server Error.")

			});

		})

    }).catch(function (error) {
	
		console.log(error);
		return res.status(500).send("Internal Server Error.");
	
	})
}