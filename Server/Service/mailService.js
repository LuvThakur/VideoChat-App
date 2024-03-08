
let mail = require("mailgun.js");
const dotenv = require('dotenv');
const { response } = require("express");

dotenv.config();

mail = {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN

}

const sendGmail = async ({ receipent, sender, subject, content, attachments }) => {
    try {
        const from = sender || "luvthakur26@gmail.com"

        const data = {
            to : receipent,
            from: sender,
            subject,
            html: content,
            attachments,
        };


        const response = await sendGmail.send(data);

        // const response = await mailgun.messages().send(data);

        console.log('Email sent:', response);
        return response;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

exports.sendEmail = async (arguments) => {


    console.log("data->",arguments);
    console.log("data->",...arguments);
    if (process.env.NODE_ENV == "development") {
        return new Promise.resolve();
    } else {

        return sendGmail(arguments);
    }

}

