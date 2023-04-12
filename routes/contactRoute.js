const express = require('express');
const {
    createContact,
    getAllContact,
    getAContast,
    deleteContact,
} = require('../controller/contactCtrl');
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.delete('/:id',authMiddleware,isAdmin,deleteContact);
router.post('/', createContact);
router.get('/', getAllContact);
router.get('/:id', getAContast);

module.exports = router;

