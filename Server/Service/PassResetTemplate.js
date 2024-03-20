function passresetemplate(firstname, url) {
    return `
        <div>
            <h1>Hello ${firstname},</h1>
            <p>You have requested to reset your password.</p>
            <p>Please click the following link to reset your password:</p>
            <p><a href="${url}" target="_blank" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset</a></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Thank you!</p>
        </div>
    `;
}

module.exports = passresetemplate;
