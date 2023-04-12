const feedbackProduct = require('../models/feedbackProductModel');
const asyncHandler = require("express-async-handler");


const createFeedbackProduct = asyncHandler(async (req, res) => {

    try {
        const newFeedbackProduct = await feedbackProduct.create(req.body);
        res.json({ status: "Create Success", feedback: newFeedbackProduct });
    } catch (error) {
        throw new Error(error);
    }
})

const getAllFeedbackProduct = asyncHandler(async (req, res) => {
    try {
        const allFeedbackProduct = await feedbackProduct.find();
        res.json(allFeedbackProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getAFeedbackProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findFeedbackProduct = await feedbackProduct.findById({ _id: id });
        res.json({ feedbackProduct: findFeedbackProduct });
    } catch (error) {
        throw new Error(error);
    };
});

const deleteFeedbackProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await feedbackProduct.findByIdAndDelete({ _id: id });
        if (deletedCategory == null) {
            res.json({ status: "FeedbackProduct not found" });
        } else {
            res.json({ status: "Delete Success", deletedCategory });
        }
    } catch (error) {
        throw new Error(error);
    };
});

const getFeedbackProductInID = asyncHandler(async (req,res) => {
    const { idproducts } = req.query;
    
    try {
        const findFeedBack = await feedbackProduct.find({ idproduct : idproducts })
        res.json(findFeedBack)
    } catch (error) {
        throw new Error(error)
    }


})




module.exports = {
    getFeedbackProductInID,
    createFeedbackProduct,
    getAllFeedbackProduct,
    getAFeedbackProduct,
    deleteFeedbackProduct,
}