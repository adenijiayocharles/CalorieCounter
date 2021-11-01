'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const Gmail = (receiver, subject, message) => {
    const mailConfig = {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    };

    const transport = nodemailer.createTransport(smtpTransport(mailConfig));
    const mailOptions = {
        from: {
            name: 'Calorie Counter',
            address: 'info@caloriecounter.com'
        },
        to: receiver,
        subject: subject,
        html: message,
    };

    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        }
    });
};

module.exports = Gmail;
