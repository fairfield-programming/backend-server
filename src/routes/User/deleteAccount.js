module.exports = (req, res) => {

    User.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (userData) {

        bcrypt.compare(req.body.password, userData.password, function (err, result) {

            if (err) {

				console.log(err) 
				return res.status(500).send("Internal Server Error.")

			}
            if (!result) return res.status(403).send("Incorrect Password.")
            
			(async () => {
				await userData.destroy()
			})();

        })

    }).catch(function (error) {
	
		console.log(error);
		return res.status(500).send("Internal Server Error.")
	
	})
}