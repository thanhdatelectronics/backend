const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { updateInfoWeb,getInfo } = require("../controller/infoWebCtrl")
const upload = require("../utils/multer")

router.put("/",upload.single("logo"), updateInfoWeb);
router.get("/", getInfo);
module.exports = router