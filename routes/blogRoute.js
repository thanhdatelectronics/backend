const express = require("express");
const {
  BlogPageSlug,
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages,
  searchCategory,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const upload = require("../utils/multer")
const router = express.Router();

router.post("/", upload.single("image"), createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);

router.get("/blogpage", BlogPageSlug);

router.put("/:id", upload.single("image"), updateBlog);
router.put("/likes", authMiddleware, liketheBlog);
router.put("/dislikes", authMiddleware, disliketheBlog);

router.get("/search", searchCategory);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);

router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
