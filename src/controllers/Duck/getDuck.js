const duckGenerator = require('duckgen');

module.exports.getDuck = (req, res) => {
	res.set('Content-Type', 'image/svg+xml');
	return res.send(duckGenerator.formatSVG(duckGenerator.generateDuck({})));
};
