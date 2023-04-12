const Link = require('../models/linkModel')

const asyncHandler = require("express-async-handler");

const createLink = asyncHandler(async(req,res)=>{
    try {
        const newLink = await Link.create(req.body);
        res.json({status: "Create success",link: newLink});
    } catch (error) {
        throw new Error(error);
    }

})

const updateLink = asyncHandler(async (req, res) => {
    const { id} = req.params
   try {
        const uplink = await Link.findOneAndUpdate({_id:id},req.body,{new : true});
        res.json({status: "update success" , link : uplink});
   } catch (error) {
        throw new Error(error);
   }


})

const detelelink = asyncHandler(async (req, res) => {
    const { id} = req.params
   try {
        const dellink = await Link.findByIdAndDelete({_id:id});
        res.json({status: "delete success" , link : dellink});
   } catch (error) {
        throw new Error(error);
   }


})

const getAllLink = asyncHandler(async (req, res) => {
    try {
        const getLink = await Link.find();
        res.json({ Link: getLink });
    } catch (error) {
        throw new Error(error);
    }
});

const getaLink = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findLink = await Link.findById({_id : id});
        res.json({ Link: findLink });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createLink,updateLink,detelelink,getAllLink,getaLink}