const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'fairfieldprogramming@gmail.com',
		pass: process.env.GMAIL_APP_PASS,
	},
});

/**
<<<<<<< HEAD
 * @module Mailer
 * 
=======
 * Mailer is an abstraction layer that allows us to send emails using node-mailer under the hood.
>>>>>>> 40f8b7c5ee62f497de5ed4c7d88ed549512bc3b5
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
		from: '"Fairfield Programming Association" <fairfieldprogramming@gmail.com>', // sender address
		to: receivers, // list of receivers
		subject: mailSubject, // subject line
		html: mailMarkup,
	});
};
