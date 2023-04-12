const Home = require("../models/homeModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinarys");

const getHome = asyncHandler(async (req, res) => {
  try {
    const allhome = await Home.find();
    res.json(allhome);
  } catch (error) {
    throw new Error(error);
  }
});
const creteHome = asyncHandler(async (req, res) => {
  try {
    const createHome = await Home.create(req.body);
    res.json({ status: "Create Success", createHome });
  } catch (error) {
    throw new Error(error);
  }
});
const updateHome = asyncHandler(async (req, res) => {
  const getdata = await Home.find();

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
        if (substring == "imgservice") {
          cloudinary.uploader.destroy(
            getdata[0].imgservice.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgservice: {
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
          let imgservice = image.find((obj) =>
            obj.hasOwnProperty("imgservice")
          );
          if (imgheader == undefined)
            imgheader = { imgheader: getdata[0].imgheader };
          if (imgservice == undefined)
            imgservice = { imgservice: getdata[0].imgservice };

          const updatedHome = await Home.findByIdAndUpdate(
            getdata[0]._id,
            {
              imgheader: imgheader.imgheader,
              imgservice: imgservice.imgservice,
              titleheader: req.body.titleheader,
              titleprodcut1: req.body.titleprodcut1,
              titleprodcut2: req.body.titleprodcut2,
              titleservice: req.body.titleservice,
              descriptionservice: req.body.descriptionservice,
              titlesanpham1: req.body.titlesanpham1,
              descriptionsanpham1: req.body.descriptionsanpham1,
              titlesanpham2: req.body.titlesanpham2,
              descriptionsanpham2: req.body.descriptionsanpham2,
            },
            {
              new: true,
            }
          );

          res.json({ status: "Update Success", home: updatedHome });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const updatedHome = await Home.findByIdAndUpdate(
        getdata[0]._id,

        req.body,
        {
          new: true,
        }
      );

      res.json({ status: "Update Success", home: updatedHome });
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getHome,
  creteHome,
  updateHome,
};
