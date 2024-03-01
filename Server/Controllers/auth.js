const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')

// IMPORT LOCAL VAR FROM CONFIG FFIL

require('dotenv').config();


// models exports
const User = require("../Models/userModel");

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

        //  send email

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

}