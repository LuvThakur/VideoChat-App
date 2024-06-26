
const mongoose = require("mongoose");

const oneToOneMessageSchema = new mongoose.Schema({

    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },


    ],

    messages: [
        {

            to: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            from: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },

            type: {
                type: String,
                enum: ["Text", "Media", "Link", "Document"]
            },

            create_at: {
                type: Date,
                default: Date.now()
            },

            text: {
                type: String
            },

            file: {
                type:String
            },

            

        }
    ]
})


const one2oneMessage = mongoose.model('one2oneMessage', oneToOneMessageSchema); // Model name 'user'

module.exports = one2oneMessage;