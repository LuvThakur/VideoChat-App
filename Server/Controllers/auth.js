const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')

const crypto = require('crypto')

// IMPORT LOCAL VAR FROM CONFIG FFIL

require('dotenv').config();


// models exports
const User = require("../Models/userModel");
const { promisify } = require('util');

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);


console.log("->", process.env.JWT_SECRET);



// login

exports.login() = async (req, res, next) => {

    // destructuring for get email and password from body
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email and password are required"
            });
        }

        const userDoc = await User.findOne({ email: email }).select("+password");


        if (!userDoc) {
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }

        const isPasswordCorrect = await userDoc.correctPassword(password, userDoc.password);

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
    }

    catch (error) {

        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }

}

// Register 

exports.register() = async (req, res, next) => {

    const { firstname, lastname, email, password } = req.body;

    //  to prevent the modification allow only seleted fields for modification
    const filterbody = filterObject(req.body, "firstname ", "lastname", "email", " password");


    const options = {
        // ensures that the updated document is returned after the update operation
        new: true,
        // enable validation only on fields that have been modified during the update operation.
        validateModifiedOnly: true
    }

    // check user exist or not
    const existUser = await User.findOne({ email: email });

    try {


        if (existUser && existUser.verified) {

            return res.status(400).json({

                statue: "error",
                message: "User already exists"
            });


        }
        else if (existUser) {

            await User.findOneAndUpdate({ email: email }, filterbody, options)

            // Set userId in req object for later use
            req.userId = existUser._id;
            next(); // Move to the next middleware or route handler
        }
        else {
            // if user not exist 


            const newUser = create({ filterbody });

            req.userId = newUser._id;

            next();


        }


        exports.sendotp() = async (req, res, next) => {
            const { userId } = req.body;
            const newOtp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });


            // otp expiry time 

            const otpExpiryTime = Date.now() + 10 * 60 * 1000;


            await User.findByIdAndUpdate(userId, { otp: newOtp, otpExpiry: otpExpiryTime })

            //  send email functionality remains

            res.statue(200).json({
                status: "success",
                message: "Otp sent successfully"
            })

        }


        exports.verifiedOtp() = async (req, res, next) => {

            //  verify an otp and update user record in db

            const { email, otp } = req.body;


            const userInfo = await User.findOne({
                email,

                otpExpiryTime: { $gt: Date.now() } // otpexpiry time greater than current time 
            })

            if (!userInfo) {
                return res.status(400).json({
                    error: "User not found"
                })
            }

            if (userInfo.otpExpiryTime < Date.now()) {
                return res.status(400).json({
                    error: "Otp expired"
                })
            }

            // compare otp

            const isOtpmatch = await userInfo.correctOtp(otp, userInfo.otp)


            if (!isOtpmatch) {
                return res.status(400).json({
                    error: "wrong otp"
                })
            }

            userInfo.verified = true;

            userInfo.otp = undefined;

            await userInfo.save({ new: true, validateModifiedOnly: true });


        }


        const token = signToken(userInfo._id);

        res.status(200).json({
            status: "success",
            token,
            message: "Signup successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            message: "internal error"
        })
    }
}


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


exports.forgetPassword = async (req, res, next) => {

    // get user email

    const userdata = await User.findOne({ email: req.body.email });


    // user not found

    if (!userdata) {
        return res.status(404).json({ success: false, error: 'User not found assocaited with this email' });
    }

    // generate the random reset token
    const resetToken = userdata.createPasswordResetToken();

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

        await userdata.save();


        return res.status(500).json({

            status: "error",
            message: "error occurs while sending an email"
        })
    }


}

exports.resetPassword = async (req, res, next) => {
    try {
        const hasToken = crypto.createHash("sha256").update(req.params.token).digest('hex');

        // compare these field with Schema fields passwordResetToken and passwordResetExpires
        const userData = await User.findOne({
            passwordResetToken: hasToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        // If no user found, token is invalid or expired
        if (!userData) {
            return res.status(400).json({
                status: "error",
                message: 'Invalid or expired token'
            });
        }

        // Update user's password after submit request
        userData.password = req.body.password;
        userData.confirmPassword = req.body.confirmPassword;

        // Clear password fields from the object
        userData.passwordResetToken = undefined;
        userData.passwordResetExpires = undefined;

        // Save the updated user object
        await userData.save({ validateBeforeSave: false });

        // Optionally, send email to notify users of password change

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
            status: "error",
            message: "Internal Server Error"
        });
    }
};