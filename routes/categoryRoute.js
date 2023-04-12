const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getaCategory,
    fiterCTNBySlugCate
} = require("../controller/categoryCtrl");
router.get("/finctn", fiterCTNBySlugCate);
router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware,isAdmin, updateCategory);
router.delete("/:id", authMiddleware,isAdmin, deleteCategory);
router.get("/", getAllCategory);
router.get("/:id", getaCategory);
module.exports = router;