const mongoose = require('mongoose');
var feedbackProductSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    quality: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    usename: {
        type: String,
        required: true,
    },
    idproduct: {
        type: String,
        required: true,
    }
},
    {
        timestamps: {
            currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
        }
    }
);
module.exports = mongoose.model('feedbackProduct', feedbackProductSchema)