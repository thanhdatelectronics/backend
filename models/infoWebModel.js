const mongoose = require("mongoose");

const InfoWebSchema = mongoose.Schema({
  nameweb: {
    type: String,
  },
  address: {
    type: String,
  },
  hotline: {
    type: String,
  },
  slogan: {
    type: String,
  },
  iframeggmap: {
    type: String,
  },
  logo: {
    public_id: String,
    secure_url: String,
  },
  zalo: {
    type: String,
  },
  facebook: {
    type: String,
  },
  gmail: {
    type: String,
  },
});

module.exports = mongoose.model("InfoWeb", InfoWebSchema);
