const { mailer } = require('../helpers/mailer');
const fs = require('fs');
const path = require('path');

const { EVENT_REMAINDER } = require('../constants');

// import Models
const { Events, Op } = require('../models');

/**
 * @module Event Notification | Event Remainder
 *
 * @description This async functions will search to find all the events in our database that will take place in a day or less,
 * Grab all the subscribers, send them an email notification as a remainder.
 *
 * @todo
 * Optimize.
 *
 */

module.exports.eventRemainder = async () => {
	// find events that will take place soon.

	const events = await Events.findAll({
		where: {
			date: {
				[Op.lte]: Date.now() + EVENT_REMAINDER,
			},
		},
		attributes: ['id', 'ownerId', 'name', 'date'],
	});

	if (!events?.length) {
		return;
	}

	events.forEach(async (event) => {
		// find all the subscribers.
		const subs = await event.getUsers();

		// send an email to all of them.

		subs.forEach((sub) => {
			// build-up the mail markup
			let emailData = fs.readFileSync(path.join(process.cwd(), '/res/emails/eventNotification.html'), 'ascii');

			emailData = emailData.replace('${event.name}', event.name);
			emailData = emailData.replace('${sub.username}', sub.username);

			// send the email
			mailer(emailData, String(sub.email), 'Event Notification | Fairfield Programming Association');
		});
	});
};
