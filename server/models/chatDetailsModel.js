const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatDetails = new Schema({
    senderName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    room:  {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    
}, {timestamps: true});

module.exports = mongoose.model('ChatDetail', chatDetails);