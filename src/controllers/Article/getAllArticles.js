
const { Article } = require('../../models');
// import Express types
const { Request, Response } = require('express');
/**
 * @module Get All Articles Controller
 *
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 *
 * @description
 * This controller will allow the user to see all the articles.
 *
 * @todo
 * Nothing for now.
 */

module.exports.getAllArticles = async (req, res) => {
	try {
		
		const articles = await Article.findAll({});

		if (!articles?.length) {
			return res.status(404).send({ msg: 'No articles found' });
		}

		return res.status(200).json(articles);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: 'Error on searching for all articles.' });
	}
};
