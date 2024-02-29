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
        const newOtp = otpGenerator.generate(6, { digits: true,  upperCaseAlphabets: false, specialChars: false });

    }


}