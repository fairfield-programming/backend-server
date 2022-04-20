const { mailer } = require("../helpers/mailer");
const { sign } = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");



/**
 * @module Remove User Accounts With Unconfirmed Email Addresses
 * 
 * @description This async functions will search to find all the users in our database where confirmed_email is set to false,
 * it will retreive thier ids, then it deletes all the related data to that user before destroying the user itself.
 * 
 * @todo
 * Optimize.
 * 
 */

module.exports.remove_unconfirmed_email_users = async () => {


    // find and retreive all the users with an unconfirmed email address
    // this query only retreives the ids, for perfomance reasons

    const found_users = await User.findAll(
        {
            where:
            {
                confirmed_email: false,
            },
            attributes: ['id', 'createdAt'],
            raw: true,
        },
    )

    if (found_users != undefined && found_users.length) {

        // at this stage found_users will look like [ { id: 1, createdAt: '2022-03-26 22:23:43.002 +00:00' } ]
        // we want to turn it into an ids array which will look like [1], if the createdAt refers to a date before a month ago
        const ids = [];
        found_users.forEach((element) => {
            if (Date.parse(element.createdAt) < (Date.now() - 30 * 24 * 60 * 60 * 1000)) {
                ids.push(element.id);
            }
        })


        //remove all the data that belongs to a user with an unconfirmed email address
        await Promise.allSettled([
            Events.findAll(
                {
                    where:
                    {
                        ownerId: { [Op.in]: ids },
                    },
                },
            )
            ,
            User.destroy(
                {
                    where:
                    {
                        id: { [Op.in]: ids },
                    },
                },
            )
        ])

    }


}


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

module.exports.email_confirmation_reminder = async () => {

    // find and retreive all the users with an unconfirmed email address
    // this query only retreives the ids, for perfomance reasons

    const found_users = await User.findAll(
        {
            where:
            {
                confirmed_email: false,
            },
            attributes: ['id', 'createdAt', 'username', 'email'],
            raw: true,
        },
    )

    if (found_users != undefined && found_users.length) {

        // at this stage found_users will look like [ { id: 1, createdAt: '2022-03-26 22:23:43.002 +00:00' } ]
        // we want to turn it into an ids array which will look like [1], if the createdAt refers to a date before 10 ago

        const selected_users = [];
        found_users.forEach((element) => {
            if (Date.parse(element.createdAt) < (Date.now() - 14 * 24 * 60 * 60 * 1000)) {
                selected_users.push({
                    id: element.id,
                    username: element.username,
                    email: element.email,
                });
            }
        })



        selected_users.forEach((element) => {

            const id_token = sign({ id: element.id }, process.env.EMAIL_TOKEN, { expiresIn: "10 days", });


            let emailData = fs.readFileSync(path.join(process.cwd(), "/res/emails/confirmEmail.html"), 'ascii');

            emailData = emailData.replace("${data.username}", element.username);
            emailData = emailData.replace("${id_token}", id_token);

            // send the email 
            mailer(emailData, String(element.email), "Confirm Your Email Address - Reminder");

        })


    }
}