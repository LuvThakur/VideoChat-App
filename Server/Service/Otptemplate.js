function otpTemplate(firstname, OtpCode) {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333; margin-bottom: 20px;">Hello ${firstname},</h1>
            <p style="color: #555; font-size: 16px;">Your One-Time Password (OTP) for Video-Chat-App is:</p>
            <div style="background-color: #fff; padding: 10px 20px; border-radius: 5px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
                <h2 style="color: #333; font-size: 24px; margin: 0;">${OtpCode}</h2>
            </div>
            <p style="color: #555; font-size: 16px;">This OTP is valid for 10 minutes.</p>
            <p style="color: #555; font-size: 16px;">If you did not request this OTP, please ignore this message.</p>
            <p style="color: #555; font-size: 16px;">Thank you!</p>
        </div>
    `;
}

module.exports = otpTemplate;
