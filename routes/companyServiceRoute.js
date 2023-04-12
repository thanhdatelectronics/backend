const express = require("express");
const {
   getAllCompanyService,
   createCompanyService,
   updateCompanyService,
} = require("../controller/companyServiceCtr");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../utils/multer")

router.put("/", upload.any(), updateCompanyService);
router.get("/", getAllCompanyService);
router.post("/", createCompanyService);

module.exports = router;
