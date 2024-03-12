const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const crypto = require('crypto');

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
    confirmPassword: {
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
        type: String
    },
    otpExpiry: {
        type: Date
    }

})

/*
// this hook call before save an otp
userSchema.pre("save", async function (next) {
    try {

        if (!this.isModified('otp')) {
            Error("otp is rred")
            return next();
        }


        // Check if otp is present
        if (!this.otp) {
            return next(new Error("otp is required"));
        }

        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedOtp = await bcrypt.hash(this.otp, saltRounds);
        this.otp = hashedOtp;


        next();
    } catch (error) {
        return next(error);
    }
});

*/



// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
    try {
        // Check if the password has been modified or is new
        if (!this.isModified('password')) {
            return next();
        }

        // Check if password is present
        if (!this.password) {
            return next(new Error("Password is required"));
        }

        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.correctPassword = async function (storePassword, userPassword) {

    return await bcrypt.compare(storePassword, userPassword);
}


// userSchema.methods.correctOtp = async function (enteredOtp, savedOtp) {

//     return await bcrypt.compare(enteredOtp, savedOtp);
// }

// // check an otp
// userSchema.methods.correctOtp = async function (enteredOtp, savedOtp) {
//     try {

//         console.log("Is O", enteredOtp, savedOtp);

//         const isMatch = await bcrypt.compare(enteredOtp, savedOtp);
//         // const isMatch = (enteredOtp === savedOtp);
//         console.log("Is OTP Match?", isMatch);
//         return isMatch;
//     } catch (error) {
//         console.error("Error comparing OTPs:", error);
//         return false; // Return false if there's an error
//     }
// };


// to passwordResetToken in random has form

userSchema.methods.createPasswordResetToken = function () {

    const tokenLength = 32;
    const resetToken = crypto.randomBytes(tokenLength);

    // Create a SHA-256 hash of the random bytes
    const hash = crypto.createHash('sha256');

    hash.update(resetToken);

    const resetTokenHash = hash.digest('hex');

    this.passwordResetToken = resetTokenHash;

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //expire after 10 min
    return resetTokenHash;

}

// ensure user log out or not able access when another user reset password recently
userSchema.checkPasswordAfterissue = function (time) {

    return time < this.passwordChangesAt;
}

const User = mongoose.model('user', userSchema); // Model name 'user'

module.exports = User;