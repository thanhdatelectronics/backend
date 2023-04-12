const mongoose = require('mongoose');
var feedbackBlog = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    usename:{
        type: String,
        required: true,
    },
    website:{
        type: String,
        required: true,
    },
    idblog:{
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
module.exports = mongoose.model('feedbackBlog', feedbackBlog)