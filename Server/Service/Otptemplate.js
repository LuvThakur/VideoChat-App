

function otpTemplate(firstname, OtpCode) {

    return `
     <div>
            <h1>Hello ${firstname},</h1>
            <p>Your OTP for Video-Chat-App is: ${OtpCode}</p>
            <p>This OTP is valid for 10 minutes.</p>
            <p>Thank you!</p>
        </div>

    `
}


module.exports = otpTemplate;