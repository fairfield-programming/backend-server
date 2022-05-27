const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ghernaoutmassi@gmail.com',
		pass: process.env.GMAIL_APP_PASS,
	},
});

// fairfieldprogramming
// fairfieldprogramming


/**
 * @module Mailer
 * 
 * Mailer is an abstraction layer that allows us to send emails using node-mailer under the hood.
 * @param {String} mailMarkup - html based markup
 * @param {String} receivers  - a comma sperated list of email addresses
 * @param {String} mailSubject - the mail subject
 * 
 * @description
 * Mailer is an abstraction layer that allows us to send emails using node-mailer under the hood. 
 * 
 */

module.exports.mailer = function (mailMarkup, receivers, mailSubject) {
	transporter.sendMail({
		from: '"Fairfield Programming Association" <ghernaoutmassi@gmail.com>', // sender address
		to: receivers, // list of receivers
		subject: mailSubject, // subject line
		html: mailMarkup,
	});
};
