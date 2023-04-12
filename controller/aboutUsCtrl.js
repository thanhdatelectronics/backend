const AboutUs = require("../models/aboutUsModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinarys");

const getAboutUs = asyncHandler(async (req, res) => {
  try {
    const allAboutUs = await AboutUs.find();
    res.json(allAboutUs);
  } catch (error) {
    throw new Error(error);
  }
});
const creteAbout = asyncHandler(async (req, res) => {
  try {
    const createAboutUs = await AboutUs.create(req.body);
    res.json({ status: "Create Success", createAboutUs });
  } catch (error) {
    throw new Error(error);
  }
});
const updateAboutUs = asyncHandler(async (req, res) => {
  const getdata = await AboutUs.find();

  try {
    if (req.files != undefined) {
      const image = [];
      const promises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "thanhdat",
        });

        const substring = result.original_filename.split("-").shift();
        console.log(substring);
        if (substring == "imgheader") {
          cloudinary.uploader.destroy(
            getdata[0].imgheader.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgheader: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgwhoarewe") {
          cloudinary.uploader.destroy(
            getdata[0].imgwhoarewe.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgwhoarewe: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgstartupstory1") {
          cloudinary.uploader.destroy(
            getdata[0].imgstartupstory1.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgstartupstory1: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgstartupstory2") {
          cloudinary.uploader.destroy(
            getdata[0].imgstartupstory2.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgstartupstory2: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgslide1") {
          cloudinary.uploader.destroy(
            getdata[0].imgslide1.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgslide1: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgslide2") {
          cloudinary.uploader.destroy(
            getdata[0].imgslide2.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgslide2: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgslide3") {
          cloudinary.uploader.destroy(
            getdata[0].imgslide3.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgslide3: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
      });

      Promise.all(promises)
        .then(async () => {
          let imgheader = image.find((obj) => obj.hasOwnProperty("imgheader"));
          let imgwhoarewe = image.find((obj) =>
            obj.hasOwnProperty("imgwhoarewe")
          );
          let imgstartupstory1 = image.find((obj) =>
            obj.hasOwnProperty("imgstartupstory1")
          );
          let imgstartupstory2 = image.find((obj) =>
            obj.hasOwnProperty("imgstartupstory2")
          );
          let imgslide1 = image.find((obj) => obj.hasOwnProperty("imgslide1"));
          let imgslide2 = image.find((obj) => obj.hasOwnProperty("imgslide2"));
          let imgslide3 = image.find((obj) => obj.hasOwnProperty("imgslide3"));

          if (imgheader == undefined)
            imgheader = { imgheader: getdata[0].imgheader };
          if (imgwhoarewe == undefined)
            imgwhoarewe = { imgwhoarewe: getdata[0].imgwhoarewe };
          if (imgstartupstory1 == undefined)
            imgstartupstory1 = {
              imgstartupstory1: getdata[0].imgstartupstory1,
            };
          if (imgstartupstory2 == undefined)
            imgstartupstory2 = {
              imgstartupstory2: getdata[0].imgstartupstory2,
            };
          if (imgslide1 == undefined)
            imgslide1 = { imgslide1: getdata[0].imgslide1 };
          if (imgslide2 == undefined)
            imgslide2 = { imgslide1: getdata[0].imgslide2 };
          if (imgslide3 == undefined)
            imgslide3 = { imgslide3: getdata[0].imgslide3 };

          const updatedAboutUs = await AboutUs.findByIdAndUpdate(
            getdata[0]._id,
            {
              imgheader: imgheader.imgheader,
              imgwhoarewe: imgwhoarewe.imgwhoarewe,
              imgstartupstory1: imgstartupstory1.imgstartupstory1,
              imgstartupstory2: imgstartupstory2.imgstartupstory2,
              imgslide1: imgslide1.imgslide1,
              imgslide2: imgslide2.imgslide2,
              imgslide3: imgslide3.imgslide3,
              descriptionwhoarewe: req.body.descriptionwhoarewe,
              descriptionstartupstory1: req.body.descriptionstartupstory1,
              descriptionstartupstory2: req.body.descriptionstartupstory2,
              descriptionstartupstory3: req.body.descriptionstartupstory3,
              chatluong: req.body.chatluong,
              chuyennghiep: req.body.chuyennghiep,
              tienphong: req.body.tienphong,
              tamnhin: req.body.tamnhin,
              sumang: req.body.sumang,
            },
            {
              new: true,
            }
          );
          res.json({
            status: "Update Success",
            AboutUs: updatedAboutUs,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const updatedAboutUs = await AboutUs.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ status: "Update Success", AboutUs: updatedAboutUs });
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getAboutUs,
  creteAbout,
  updateAboutUs,
};
