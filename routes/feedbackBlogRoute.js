const express = require('express');
const {
    createFeedbackBlog,
    getAllFeedbackProducts,
    getAFeedbackBlog,
    deleteFeedbackBlog,
    getFeedbackBlogInId,
} = require('../controller/feedbackBlogCtrl')
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/feedback', getFeedbackBlogInId);
router.post('/', createFeedbackBlog);
router.delete('/:id', authMiddleware,isAdmin, deleteFeedbackBlog);
router.get('/', getAllFeedbackProducts);
router.get('/:id', getAFeedbackBlog);

module.exports = router;