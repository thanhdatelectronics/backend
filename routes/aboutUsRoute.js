const express = require("express");
const {
    getAboutUs,
    creteAbout,
    updateAboutUs,
} = require("../controller/aboutUsCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../utils/multer")

router.get("/", getAboutUs);
router.post("/", creteAbout);
router.put("/",upload.any(), updateAboutUs);
module.exports = router;
