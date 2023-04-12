const companyService = require("../models/companyServiceModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinarys");

const getAllCompanyService = asyncHandler(async (req, res) => {
  try {
    const allCompanyService = await companyService.find();
    res.json(allCompanyService);
  } catch (error) {
    throw new Error(error);
  }
});
const createCompanyService = asyncHandler(async (req, res) => {
  try {
    const createdCompanyService = await companyService.create(req.body);
    res.json({ status: "Create Success", createdCompanyService });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCompanyService = asyncHandler(async (req, res) => {
  const getdata = await companyService.find();

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
        if (substring == "imgbody1") {
          cloudinary.uploader.destroy(
            getdata[0].imgbody1.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgbody1: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgbody2") {
          cloudinary.uploader.destroy(
            getdata[0].imgbody2.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgbody2: {
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
          let imgbody1 = image.find((obj) => obj.hasOwnProperty("imgbody1"));
          let imgbody2 = image.find((obj) => obj.hasOwnProperty("imgbody2"));
          if (imgheader == undefined)
            imgheader = { imgheader: getdata[0].imgheader };
          if (imgbody1 == undefined)
            imgbody1 = { imgbody1: getdata[0].imgbody1 };
          if (imgbody2 == undefined)
            imgbody2 = { imgbody2: getdata[0].imgbody2 };

          const updatedCompanyService = await companyService.findByIdAndUpdate(
            getdata[0]._id,
            {
              titleheader: req.body.titleheader,
              titlebody1: req.body.titlebody1,
              imgheader: imgheader.imgheader,
              imgbody1: imgbody1.imgbody1,
              imgbody2: imgbody2.imgbody2,
            },
            {
              new: true,
            }
          );
          res.json({
            status: "Update Success",
            companyService: updatedCompanyService,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      req.body.imgbody1 = getdata[0].imgbody1.secure_url;
      req.body.imgbody2 = getdata[0].imgbody2.secure_url;
      req.body.imgheader = getdata[0].imgheader.secure_url;
      const updatedCompanyService = await companyService.findByIdAndUpdate(
        getdata[0]._id,
        req.body,
        {
          new: true,
        }
      );
      res.json({
        status: "Update Success",
        companyService: updatedCompanyService,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getAllCompanyService,
  createCompanyService,
  updateCompanyService,
};
