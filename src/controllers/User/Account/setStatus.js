const vulgarTester = require('../../../library/VulgarTest');
const { handleError500 } = require('../../../library/errorHandler');

module.exports.setStatus = (req, res) => {
	if (!req.user) res.status(403).send('Not Logged In.');
	else {
		User.findOne({
			where: {
				id: req.user.id,
			},
		})
			.then((data) => {
				if (!data) res.status(404).send('Not Found.');
				else if (!req.body.status) {
					if (vulgarTester.detectVulgarWords(req.body.status)) res.status(406).send('Vulgar Language Detected.');
				} else {
					data
						.update({
							status: req.body.status,
						})
						.then((newData) => res.status(200).send(newData.status))
						.catch((error) => handleError500(error));
				}
			})
			.catch((error) => handleError500(error));
	}
};
