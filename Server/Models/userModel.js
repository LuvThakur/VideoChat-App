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


// this hook call before save an password
userSchema.pre("save", async function (next) {
    // if password not modified
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.correctPassword = async function (storePassword, userPassword) {

    return await bcrypt.compare(storePassword, userPassword);
}



userSchema.methods.correctOtp = async function (storeOtp, userOtp) {
    return await bcrypt.compare(storeOtp, userOtp);
}


// to passwordResetToken in random has form

userSchema.methods.createPasswordResetToken = function () {

    const tokenLength = 32;
    const resetToken = crypto.randomBytes(tokenLength);

    // Create a SHA-256 hash of the random bytes
    const hash = crypto.createHash('sha256');

    hash.update(resetToken);

    const resetTokenHash = hash.digest('hex');

    this.passwordResetToken = resetToken;

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //expire after 10 min
    return resetTokenHash;

}

// ensure user log out or not able access when another user reset password recently
userSchema.checkPasswordAfterissue = function (time) {

    return time < this.passwordChangesAt;
}

const User = mongoose.model('user', userSchema); // Model name 'user'

module.exports = User;