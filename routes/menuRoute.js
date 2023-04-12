const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const {
    CreateMenu,
    getAllMenu,
    getaMenu,
    updateMenu,
    deleteMenu
} = require("../controller/menuCtrl")

//router.post("/",isAdmin,CreateMenu); 
router.post("/", authMiddleware, isAdmin, CreateMenu);
router.get("/", getAllMenu);
router.get("/:id", getaMenu);
router.put("/:id", authMiddleware, isAdmin, updateMenu);
router.delete("/:id", authMiddleware, isAdmin, deleteMenu);
module.exports = router
