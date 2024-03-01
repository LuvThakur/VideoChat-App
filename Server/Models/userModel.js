const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Schema } = mongoose;


const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"]
    },

    lastname: {
        type: String,
        required: [true, "Last Name is required"]
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {

            validator: function (value) {

                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(value).toLowerCase());

            },

            message: (props) => { `${props.value}  is not a valid email address` }

        },

    },

    password: {
        type: String
    },

    passwordChangesAt: {

        type: Date
    },

    passwordResetToken: {
        type: String
    },

    passwordResetExpires: {
        type: Date
    },

    createAt: {
        type: Date
    },

    updatedAt: {
        type: Date
    },
    verified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: Number
    },
    otpExpiry: {
        type: Date
    }

})

// this hook call before save an otp
userSchema.pre("save", async function (next) {

    // if otp not modified 

    if (!this.isModified("otp")) {
        return next();
    }
    try {
        const hasotp = bcrypt.hash(this.otp, 12)

        this.otp = hasotp

        next();
    }
    catch (error) {
        return next(error);
    }
})

userSchema.methods.correctPassword = async function (storePassword, userPassword) {

    return await bcrypt.compare(storePassword, userPassword);
}



userSchema.methods.correctOtp = async function (storeOtp, userOtp) {
    return await bcrypt.compare(storeOtp, userOtp);
}

const User = mongoose.model('user', userSchema); // Model name 'user'

module.exports = User;