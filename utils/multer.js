
const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now());
        },

    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".JPEG" && ext !== ".JPG" && ext !== ".PNG") {
            console.log(error);
            return;
        }
        cb(null, true);
    },
});