module.exports = (req, res) => {
    if (req.params.id == undefined) return res.status(400).send("Not All Parameters Provided.")

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
				//await sequelize.sync({ force: true });
				await userData.update({password:req.body.newPassword})
            	await userData.save()
			})();

        })
	
	}).catch(function (error) {
	
		console.log(error);
		return res.status(500).send("Internal Server Error.")
	
	})
}