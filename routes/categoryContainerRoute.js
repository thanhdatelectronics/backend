const express = require('express')
const router = express.Router();

const {
    createCategoryContainer,
    getAllCategoryContainer,
    deleteCategoryContainer,
    updateCategoryContainer,
    getCategoryContainer
} = require('../controller/categoryContainerCtrl');

const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, isAdmin, createCategoryContainer);
router.delete('/:id', authMiddleware, isAdmin, deleteCategoryContainer);
router.put('/:id', authMiddleware, isAdmin, updateCategoryContainer);
router.get('/:id', getCategoryContainer);
router.get('/', getAllCategoryContainer);
module.exports = router;