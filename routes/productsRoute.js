const express = require("express");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  fiterCategoryContainerBySlug,
  createProducts,
  getAllProducts,
  getaProducts,
  updateProducts,
  deleteProducts,
  getAllProductsPage,
  fitercategory,
  fiterCategoryContainer,
  updateimagedetailproduct,
  updateProductsImgDetail,
} = require("../controller/productsCtrl");
const upload = require("../utils/multer");

const router = express.Router();

router.post("/", upload.array("image", 10), createProducts);

router.get("/fitercontainer", fiterCategoryContainer);
router.get("/fitercontainerslug", fiterCategoryContainerBySlug);
router.get("/", getAllProductsPage);
router.get("/fitercategory", fitercategory);
router.get("/getall", getAllProducts);
router.get("/:id", getaProducts);
router.put("/:id", upload.array("image", 10), updateProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProducts);

module.exports = router;
