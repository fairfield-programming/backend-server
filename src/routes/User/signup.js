module.exports = (req, res) => {

	// Check That All Parameters Are Given
	if (req.body.username == undefined || req.body.password == undefined || req.body.email == undefined) return res.status(400).send("Not All Parameters Provided.")
	
	// Verify Password
	if (req.body.password.length > 14) return res.status(400).send("Invalid Password.")
	if (req.body.password.length < 4) return res.status(400).send("Invalid Password.")
	if (!req.body.password.match(/[A-Z]/)) return res.status(400).send("Invalid Password.")
	if (!req.body.password.match(/[a-z]/)) return res.status(400).send("Invalid Password.")
	if (!req.body.password.match(/[0-9]/)) return res.status(400).send("Invalid Password.")
	if (!req.body.password.match(/(\#|\?|\!|\@|\$|\%|\^|\&|\*|\-|\_)/)) return res.status(400).send("Invalid Password.")
	
	// Verify Email 
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(req.body.email)) return res.status(400).send("Invalid Email.")
	
	// Verify Username
	if (req.body.username.length > 30) return res.status(400).send("Invalid Username.");
	if (req.body.username.length < 4) return res.status(400).send("Invalid Username.");

	if (req.body.username.includes(' ')) return res.status(400).send("Invalid Username.");
	if (/[0-9]/g.test(req.body.username)) return res.status(400).send("Invalid Username.");
	if (/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g.test(req.body.username)) return res.status(400).send("Invalid Username");
	if (req.body.username.toLowerCase() !== req.body.username) return res.status(400).send("Invalid Username.");

	User.findAll({
		where: {
			[Op.or]: [
				{ username: req.body.username },
				{ email: req.body.email }
			]
		}
	}).then(function (userData) {
	
		if (userData.length > 0) return res.status(403).send("Account Already Exists.")
		
		bcrypt.hash(req.body.password, 10, function (err, hash) {
		
			if (err) {
				console.log(err)
				return res.status(500).send("Internal Server Error.")
			}
			
			User.create({
				username: req.body.username,
				password: hash,
				email: req.body.email
			}).then(function (data) {
			
				return res.json({ 
					token: jwt.sign(
						{
							username: data.username,
							email: data.email
						}, process.env.JWT_KEY)
					})
			
			}).catch(function (error) {
			
				console.log(error);
				return res.status(500).send("Internal Server Error.")
			
			})
		
		});
	
	}).catch(function (error) {
	
		console.log(error);
		return res.status(500).send("Internal Server Error.")
	
	})

}