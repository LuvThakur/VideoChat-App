const mg = require('mailgun-js');
const dotenv = require('dotenv');

dotenv.config();

const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const isInternetConnected = () => {
  return new Promise((resolve, reject) => {
    require('dns').lookup('google.com', function(err) {
      if (err && err.code === "ENOTFOUND") {
        console.error("No internet connection");
        resolve(false);
      } else {
        console.log("Internet connected");
        resolve(true);
      }
    });
  });
};

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

        const internetAvailable = await isInternetConnected();

        if (internetAvailable) {
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
        } else {
            console.error("Cannot send email, no internet connection");
            // Instead of throwing an error, you can handle the error accordingly
            // Maybe log it or return a specific error code/status
            // throw new Error("No internet connection");
        }

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
