const mongoose = require('mongoose');
var companyServiceSchema = new mongoose.Schema({
    imgheader : {
        public_id: String,
        secure_url: String,
    },
    titleheader : {
        type: String,
        required: true,
    },
    imgbody1 : {
        public_id: String,
        secure_url: String,
    }, 
    titlebody1 :{
        type: String,
        required: true,
    },
    imgbody2:{
        public_id: String,
        secure_url: String,
    }
},
{
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
  }
);

module.exports = mongoose.model('companyService',companyServiceSchema);
