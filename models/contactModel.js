const mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
  }
);
module.exports = mongoose.model('Contact', contactSchema);