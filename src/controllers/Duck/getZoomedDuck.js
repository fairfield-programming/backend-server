const duckGenerator = require('duckgen');
// import Express types
const { Request, Response } = require('express');
/**
 * @module Get Duck Controller
 *
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to receive a zoomed version of a specific duck svg.
 *
 * @todo
 * Nothing for now.
 */

module.exports.getZoomedDuck = (req, res) => {
	const duckData = duckGenerator.parseV1String(req.params.id);

	if (!duckData) {
		return res.status(400).send({ msg: 'Invalid duck ID' });
	}

	const zoomInt = parseInt(req.params.zoom, 10);
	res.set('Content-Type', 'image/svg+xml');
	return res.status(200).send(duckGenerator.formatSVG(duckGenerator.generateDuck(duckData), zoomInt));
};
