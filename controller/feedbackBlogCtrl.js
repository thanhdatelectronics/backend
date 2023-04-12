const feedbackBlog = require('../models/feedbackBlogModel')
const asyncHandler = require('express-async-handler')

const createFeedbackBlog = asyncHandler(async(req, res) =>{
    try{
        const createdFeedbackBlog = await feedbackBlog.create(req.body);
        res.json({status:"Create Success",createdFeedbackBlog});
    }catch(error){
        throw new Error(error);
    };
})

const getAllFeedbackProducts = asyncHandler(async(req, res) =>{
    try{
        const allFeedbackBlog = await feedbackBlog.find();
        res.json(allFeedbackBlog);
    }catch(error){
        throw new Error(error);
    };
});

const getAFeedbackBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const getFeedbackBlog = await feedbackBlog.findById({_id: id});
        console.log(getFeedbackBlog);
        res.json({feedbackBlog:getFeedbackBlog});
    }catch(error){
        throw new Error(error);
    }
})

const deleteFeedbackBlog = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    try{
        const deletedFeedbackBlog = await feedbackBlog.findByIdAndDelete({_id:id});
        if(deletedFeedbackBlog == null){
            res.json({status: "FeedBackBlog Not Found"});
        }else{
            res.json({status: "Delete Success", deletedFeedbackBlog});
        }
    }catch(error){
        throw new Error(error);
    };
});

const getFeedbackBlogInId = asyncHandler(async (req,res) => {
    const { blogid } = req.query;
    console.log(blogid);
    try {
        const findFeedBack = await feedbackBlog.find({ idblog : blogid })
        res.json(findFeedBack)
    } catch (error) {
        throw new Error(error)
    }
})
module.exports = {
    createFeedbackBlog,
    getAllFeedbackProducts,
    getAFeedbackBlog,
    deleteFeedbackBlog,
    getFeedbackBlogInId,
}