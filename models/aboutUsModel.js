const mongoose = require('mongoose');
var aboutUsSchema = new mongoose.Schema({
    imgheader: {
        public_id: String,
        secure_url: String,
    },
    imgwhoarewe:{
        public_id: String,
        secure_url: String,
    },
    descriptionwhoarewe:{
        type: String,
        required: true,
    },
    imgstartupstory1:{
        public_id: String,
        secure_url: String,
    },
    imgstartupstory2:{
        public_id: String,
        secure_url: String,
    },
    descriptionstartupstory1:{
        type: String,
        required: true,
    },
    descriptionstartupstory2:{
        type: String,
        required: true,
    },
    descriptionstartupstory3:{
        type: String,
        required: true,
    },
    imgslide1:{
        public_id: String,
        secure_url: String,
    },
    imgslide2:{
        public_id: String,
        secure_url: String,
    },
    imgslide3:{
        public_id: String,
        secure_url: String,
    },
    chatluong: {
        type: String,
        required: true,
    },
    chuyennghiep:{
        type: String,
        required: true,
    },
    tienphong:{
        type: String,
        required: true,
    },
    tamnhin:{
        type: String,
        required: true,
    },
    sumang:{
        type: String,
        required: true,
    },
},
{
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
  }
)
module.exports = mongoose.model("aboutUs", aboutUsSchema);