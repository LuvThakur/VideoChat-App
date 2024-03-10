const mg = require('mailgun-js');
const dotenv = require('dotenv');

dotenv.config();

const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const sendEmail = async ({ from, to, html, text, attachments }) => {
    try {
        const emaildata = {
            from: from,
            to: to,
            subject: 'OTP for Video-Chat-App', // Add subject here if needed
            html: html,
            text: text,
            attachments: attachments || [],
        };

        console.log("Email Data:", emaildata);

        mailgun().messages().send(emaildata, (error, body) => {
            if (error) {
                console.error("Error sending email:", error);
                // Do not handle the response here
                // Instead, throw the error for the calling function to handle
                throw error;
            } else {
                console.log("Email sent successfully:", body);
                // Do not handle the response here
                // Instead, handle the success response in the calling function
            }
        });

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
