const jwt = require('jsonwebtoken')

// IMPORT LOCAL VAR FROM CONFIG FFIL

require('dotenv').config();


// Create a JWT
const User = require("../Models/userModel");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// login

exports.login() = async (req, res, next) => {

    // destructuring for get email and password from body
    const { email, password } = req.body;


    if (!email || !password) {
        res.status(400).json({
            status: "error",
            message: "Email and password required"
        })
    }
    const userDoc = await User.findOne({ email: email }).select("+password");


    if (!userDoc || !(await userDoc.correctPassword(password,userDoc.password))) {
        res.status(400).json({
            status: "error",
            message: " Email or Password is incorect"
        })
    }




    const token = signToken();

    res.status(200).json({
        status: "success",
        message: "Logged successfully"
    })

}