const duckGenerator = require('duckgen');

module.exports.getZoomedDuck = (req, res) => {
	const duckData = duckGenerator.parseV1String(req.params.id);
	if (!duckData) {
		return res.status(400).send({ msg: 'Invalid duck ID' });
	}

	const zoomInt = parseInt(req.params.zoom, 10);
	res.set('Content-Type', 'image/svg+xml');
	return res.send(duckGenerator.formatSVG(duckGenerator.generateDuck(duckData), zoomInt));
};
