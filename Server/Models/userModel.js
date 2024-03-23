const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const crypto = require('crypto');
const { type } = require('os');

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

    passwordcreateAt: {
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
    },
    socket_id: {
        type: String
    },
    friendRequest: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]

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
        // if (!this.isModified('password')) {
        //     return next();
        // }

        // Check if password is present
        if (!this.password) {
            return next(new Error("Password is required"));
        }

        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        this.passwordcreateAt = Date.now();
        next();
    } catch (error) {
        return next(error);
    }
});


// Hash the ConfirmPassword before saving to the database
userSchema.pre("save", async function (next) {
    try {
        // Only hash confirmPassword when passwordResetToken is set and confirmPassword is provided
        if (this.isModified("password") && this.passwordResetToken && this.confirmPassword) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.confirmPassword, saltRounds);
            this.confirmPassword = hashedPassword;
        }
        next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.correctPassword = async function (storePassword, userPassword) {

    return await bcrypt.compare(storePassword, userPassword);
}

/*
userSchema.methods.correctOtp = async function (enteredOtp, savedOtp) {

    return await bcrypt.compare(enteredOtp, savedOtp);
}
*/


// to passwordResetToken in random has form

userSchema.methods.createPasswordResetToken = function () {

    const tokenLength = 32;
    const resetToken = crypto.randomBytes(tokenLength);

    // Create a SHA-256 hash of the random bytes
    const hash = crypto.createHash('sha256');

    hash.update(resetToken);

    const resetTokenHash = hash.digest('hex');

    this.passwordResetToken = resetTokenHash;

    this.passwordResetExpires = Date.now() + 2 * 60 * 1000; //expire after 2 min
    return resetTokenHash;

}

// ensure user log out or not able access when another user reset password recently
userSchema.checkPasswordAfterissue = function (time) {

    return time < this.passwordChangesAt;
}

const User = mongoose.model('user', userSchema); // Model name 'user'

module.exports = User;