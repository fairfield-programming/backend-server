const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fairfieldprogramming@gmail.com',
      pass: process.env.GMAIL_APP_PASS,
    },
  });


/**
 * 
 * @param {String} mailMarkup 
 * @param {String} receivers 
 * @param {String} mailSubject 
 * @description mailer accepts an html based markup as the first argument, a comma sperated list of receivers as the second argument, and the mail subject as the third 
 */

module.exports.mailer = function(mailMarkup, receivers, mailSubject) {
    transporter.sendMail({
        from: '"Fairfield Programming Association" <fairfieldprogramming@gmail.com>', // sender address
        to: receivers, // list of receivers
        subject: mailSubject, // Subject line
        html: mailMarkup,
      });
}