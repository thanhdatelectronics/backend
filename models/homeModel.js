const mongoose = require("mongoose");
var homeSchema = new mongoose.Schema(
  {
    imgheader: {
      public_id: String,
      secure_url: String,
    },
    titleheader: {
      type: String,
      required: true,
    },
    titleprodcut1: {
      type: String,
      required: true,
    },
    titleprodcut2: {
      type: String,
      required: true,
    },
    imgservice: {
      public_id: String,
      secure_url: String,
    },
    titleservice: {
      type: String,
      required: true,
    },
    descriptionservice: {
      type: String,
      required: true,
    },
    titlesanpham1: {
      type: String,
      required: true,
    },
    descriptionsanpham1: {
      type: String,
      required: true,
    },
    titlesanpham2: {
      type: String,
      required: true,
    },
    descriptionsanpham2: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
    },
  }
);
module.exports = mongoose.model("homeinfo", homeSchema);
