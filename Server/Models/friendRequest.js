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


const FriendRequest = mongoose.model('FriendRequest', requestSchema);

module.exports = FriendRequest;