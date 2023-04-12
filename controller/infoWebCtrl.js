const InfoWeb = require("../models/infoWebModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinarys");

const updateInfoWeb = asyncHandler(async (req, res) => {
  const info = await InfoWeb.find();
  try {
    
    if (req.file != undefined) {
      cloudinary.uploader.destroy(info[0].logo.public_id, function (result) {
        console.log(result);
      });
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "thanhdat",
      });
      req.body.logo = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      const updateInfo = await InfoWeb.findByIdAndUpdate(
        { _id: info[0]._id },
        req.body,
        { new: true }
      );
      res.json({ Status: "Update Success", Info: updateInfo });
    } else {
      req.body.logo = info[0].logo;
      const updateInfo = await InfoWeb.findByIdAndUpdate(
        { _id: info[0]._id },
        req.body,
        { new: true }
      );
      res.json({ Status: "Update Success", Info: updateInfo });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getInfo = asyncHandler(async (req, res) => {
  try {
    const info = await InfoWeb.find();
    res.json(info);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { updateInfoWeb, getInfo };
