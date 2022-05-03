const fs = require('fs');
const { sign } = require('jsonwebtoken');
const path = require('path');
const { mailer } = require('../helpers/mailer');


const {
	MAX_UNCONFIRMED_ACCOUNT_AGE,
	EMAIL_CONFIRMATION_REMAINDER_TIMEOUT,
} = require('../constants');





/**
 * @module Remove User Accounts With Unconfirmed Email Addresses
 * 
 * @description This async functions will find all the users on our database where confirmed_email is set to false for the last 30 days,
 * it will retreive thier ids, then it deletes all the related data to that user before destroying the user itself.
 * 
 */

module.exports.removeUnconfirmedAccounts = async () => {
	const accounts = await User.findAll({
		where: {
			confirmed_email: false,
		},
		attributes: ['id', 'createdAt'],
		raw: true,
	});

	if (!accounts?.length) {
		return;
	}

	accounts = accounts.filter(account => Date.parse(account.createdAt) < Date.now() - MAX_UNCONFIRMED_ACCOUNT_AGE);
	const accountIds = accounts.map(account => account.id);

	await Promise.all([
		Events.findAll({
			where: {
				ownerId: { [Op.in]: accountIds },
			},
		}),
		User.destroy({
			where: {
				id: { [Op.in]: accountIds },
			},
		}),
	]);
};




/**
 * @module Email Confirmation Reminder
 * 
 * @description This async functions will search to find all the users in our database where confirmed_email is set to false,
 * for the past 10 days, and will send them a new email so as they can confirm their email address.
 * 
 * @todo
 * Optimize.
 * 
 */

module.exports.emailConfirmationRemainder = async () => {

	// find and retreive all the users with an unconfirmed email address

	let accounts = await User.findAll(
		{
			where:
			{
				confirmed_email: false,
			},
			attributes: ['id', 'createdAt', 'username', 'email'],
			raw: true,
		},
	)
	if (!accounts?.length) {
		return;
	}

	accounts = accounts.filter(account => Date.parse(account.createdAt) < Date.now() - EMAIL_CONFIRMATION_REMAINDER_TIMEOUT);

	accounts.forEach((element) => {

		// generate a new token
		const id_token = sign({ id: element.id }, process.env.EMAIL_TOKEN, { expiresIn: "10 days", });

		// build-up the mail markup
		let emailData = fs.readFileSync(path.join(process.cwd(), "/res/emails/confirmEmail.html"), 'ascii');

		emailData = emailData.replace("${data.username}", element.username);
		emailData = emailData.replace("${id_token}", id_token);

		// send the email 
		mailer(emailData, String(element.email), "Confirm Your Email Address - Reminder");

	})


}