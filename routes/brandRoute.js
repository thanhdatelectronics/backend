const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
  fiterCTNBySlugBrand,
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/finctn", fiterCTNBySlugBrand);
router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;
