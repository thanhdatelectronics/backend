const express = require('express');
const {
    getFeedbackProductInID,
    createFeedbackProduct,
    getAllFeedbackProduct,
    getAFeedbackProduct,
    deleteFeedbackProduct,
} = require('../controller/feedbackProductCtrl')
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get('/feedback', getFeedbackProductInID);
router.post('/', createFeedbackProduct);
router.delete('/:id', authMiddleware,isAdmin, deleteFeedbackProduct);
router.get('/', getAllFeedbackProduct);
router.get('/:id', getAFeedbackProduct);
module.exports = router;