const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
    {
        
        zalo: {
            type: String,
        },
        url: {
            type: String,       
        }
    }, {
    timestamps: {
        currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
})

module.exports = mongoose.model("link",linkSchema)