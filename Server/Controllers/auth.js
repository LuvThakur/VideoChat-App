const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')

const crypto = require('crypto')

const bcrypt = require('bcrypt')

// IMPORT LOCAL VAR FROM CONFIG FFIL

require('dotenv').config();

const sendEmail = require("../Service/mailService"); // Assuming this is the path to mailService.js

// models exports
const User = require("../Models/userModel");
const { promisify } = require('util');

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// exports the fileterObjectField
const filterField = require("../Utils/FiltersObjFields");

const otpTemplate = require("../Service/Otptemplate");





// Register 
exports.register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    const filterbody = filterField(req.body, "firstname", "lastname", "email", "password");

    const options = {
        new: true,
        validateModifiedOnly: true
    }

    const existUser = await User.findOne({ email: email });

    try {
        if (existUser && existUser.verified) {
            return res.status(400).json({
                status: "error",
                message: "User already exists"
            });
        } else if (existUser) {
            await User.findOneAndUpdate({ email: email }, filterbody, options);
            req.userId = existUser._id;
        } else {
            const newUser = await User.create(filterbody);
            req.userId = newUser._id;
        }

        const token = signToken(req.userId);

        // Send OTP after registering user
        req.body.userId = req.userId; // Assuming you need this in sendOtp
        next(); // Call next here
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};


// login
exports.login = async (req, res, next) => {
    // destructuring to get email and password from body
    const { email, password: inputPassword } = req.body;

    try {
        if (!email || !inputPassword) {
            return res.status(400).json({
                status: "error",
                message: "Email and password are required"
            });
        }

        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }

        const storedPassword = userDoc.password.trim(); // Trim stored password

        const isPasswordCorrect = await userDoc.correctPassword(inputPassword, storedPassword);

        console.log("isPasswordCorrect", isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: "error",
                message: "Incorrect password"
            });
        }

        const token = signToken(userDoc._id);

        res.status(200).json({
            status: "success",
            token,
            message: "Logged in successfully"
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
};


exports.sendOtp = async (req, res, next) => {
    try {

        const { userId } = req.body;


        // Fetch the user from the database using the userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        // Now user has email property
        const userEmail = user.email;

        const newOtp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        const otpExpiryTime = Date.now() + 10 * 60 * 1000;

        // Update user with new OTP and expiry time
        await User.findByIdAndUpdate(userId, { otp: newOtp, otpExpiry: otpExpiryTime });

        await user.save({ new: true, validateModifiedOnly: true });

        // Send OTP email
        await sendEmail({
            from: 'luvthakur262001@gmail.com', // Replace with a valid email
            to: userEmail,
            subject: "OTP for Video-Chat-App",
            html: otpTemplate(user.firstname, newOtp),
            text: `Your OTP is ${newOtp} and is valid for 10 minutes`,
            attachments: [],
        });

        res.json({ message: "Email sent successfully in auth" });

    } catch (error) {
        console.error("er->", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};

exports.verifiedOtp = async (req, res, next) => {
    // verify an otp and update user record in db
    const { email, otp } = req.body;

    const userInfo = await User.findOne({
        email,
    });


    if (!userInfo) {
        // If user not found
        return res.status(400).json({
            error: "User not found for the provided email"
        });
    }

    if (userInfo.verified) {
        return res.status(400).json({
            message: "Email already verified"
        })
    }

    if (userInfo.otpExpiry < Date.now()) {
        // If OTP has expired
        return res.status(400).json({
            error: "OTP has expired"
        })

    }


    // console.log("email->", email, "otpExpiry->", userInfo.otpExpiry);

    // console.log("otpb->", otp, "saveotp->", userInfo.otp);

    // compare otp
    // const isOtpMatch = await userInfo.correctOtp(otp, userInfo.otp);
    // const isOtpMatch = await bcrypt.compare(otp,userInfo.otp);
    const isOtpMatch = (otp === userInfo.otp);

    console.log("Is OTP Match?", isOtpMatch);

    if (!isOtpMatch) {
        return res.status(400).json({
            error: "Wrong otp"
        });
    }
    userInfo.verified = true;
    userInfo.otp = undefined;

    await userInfo.save({ new: true, validateModifiedOnly: true });

    res.json({ message: "OTP verified successfully" });
};




exports.forgetPassword = async (req, res, next) => {

    // get user email

    const userdata = await User.findOne({ email: req.body.email });


    // user not found

    if (!userdata) {
        return res.status(404).json({ success: false, error: 'User not found assocaited with this email' });
    }

    // generate the random reset token
    const resetToken = userdata.createPasswordResetToken();

    await userdata.save({ validateBeforeSave: false });

    console.log("User-Data ", userdata);
    console.log("reset->", resetToken);

    // url which send an link of resetToken
    const Url = `https://chat.com/auth/forget-password/?code=${resetToken}`;

    try {

        // make send email with reset url functionality

        return res.status(200).json({
            status: "Success",
            message: "Reset Link Send  to email Successfully"
        })
    }
    catch (error) {
        userdata.passwordResetToken = undefined;
        userdata.passwordResetExpires = undefined;

        await userdata.save({ validateBeforeSave: false });


        return res.status(500).json({

            status: "error",
            message: "error occurs while sending an email"
        })
    }


}


exports.resetPassword = async (req, res, next) => {
    const { Password, ConfirmPassword, Reqtoken } = req.body; // Extract password and confirmPassword


    try {
        // Compare hashed token with database
        const userData = await User.findOne({
            passwordResetToken: Reqtoken,
            passwordResetExpires: { $gt: Date.now() }
        });

        console.log("User-Data ", userData);

        // If no user found, token is invalid or expired
        if (!userData) {
            return res.status(400).json({
                status: "error",
                message: 'Invalid or expired token'
            });
        }

        // Check if passwords match
        if (Password !== ConfirmPassword) {
            return res.status(400).json({
                status: "error",
                message: "Passwords do not match"
            });
        }

        // Update user's password after submit request
        userData.password = Password;
        userData.confirmPassword = ConfirmPassword;

        // Clear password fields from the object
        userData.passwordResetToken = undefined;
        userData.passwordResetExpires = undefined;


        // password change at 

        userData.passwordChangesAt = Date.now();

        // Save the updated user object
        await userData.save({ validateBeforeSave: false });

        // Generate JWT token for the user
        const token = signToken(userData._id);

        // Send response with token
        res.status(200).json({
            status: "success",
            token,
            message: "Password reset successful. You can now log in with your new password."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error1",
            message: "Internal Server Error"
        });
    }
};



//  protect routes 
exports.protect = async (req, res, next) => {
    try {
        let authToken;

        // Check for the presence of the token in headers or cookies
        const token = req.headers.authorization;

        if (token && token.startsWith('Bearer')) {
            authToken = token.split(" ")[1];
        } else if (req.cookies.jwt) {
            authToken = req.cookies.jwt;
        } else {
            return res.status(401).json({ status: "error", message: 'Unauthorized. Please provide a valid token.' });
        }

        // Verify the token
        const verifyToken = promisify(jwt.verify);
        const decoded = await verifyToken(authToken, process.env.JWT_SECRET);

        // Check if the user associated with the token exists
        const thisUser = await User.findById(decoded.userId);
        if (!thisUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Check if the user has changed their password after the token was issued
        if (thisUser.checkPasswordAfterIssue(decoded.iat)) {
            return res.status(400).json({ status: "error", message: "User recently changed password. Please re-login." });
        }

        // Attach the decoded user data to the request object
        req.user = thisUser;
        next();
    } catch (error) {
        return res.status(401).json({ status: "error", message: 'Token is invalid or expired.' });
    }
};
