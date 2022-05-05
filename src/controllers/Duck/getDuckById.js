const duckGenerator = require('duckgen');

/**
 * @module Get Duck By ID Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to receive a specific duck svg.
 * 
 * @todo
 * Nothing for now.
 */

module.exports.getDuckById = (req, res) => {
	const duckData = duckGenerator.parseV1String(req.params.id);
	if (!duckData) {
		return res.status(400).send({ msg: 'Invalid duck ID' });
	}

	res.set('Content-Type', 'image/svg+xml');

	return res.send(duckGenerator.formatSVG(duckGenerator.generateDuck(duckData)));
};
