const express = require("express");
const { getHome, creteHome, updateHome } = require("../controller/homeCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../utils/multer");

router.get("/", getHome);
router.post("/", creteHome);
router.put("/", upload.any(), updateHome);
module.exports = router;
