const mongoose = require('mongoose')

const { Schema } = mongoose;

const requestSchema = new Schema({


    sender: {

        type: mongoose.Schema.ObjectId,
        ref: 'User'

    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now()
    }



});

const User = mongoose.model('user', userSchema); // Model name 'user'

const UserRequest = mongoose.model('userequest', requestSchema);

module.exports = UserRequest;