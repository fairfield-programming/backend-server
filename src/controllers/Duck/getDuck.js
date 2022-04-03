const duckGenerator = require('duckgen');

module.exports.getDuck = (req, res) => {
	res.set('Content-Type', 'image/svg+xml');
	res.send(duckGenerator.formatSVG(duckGenerator.generateDuck({})));
};
