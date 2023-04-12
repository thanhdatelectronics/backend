const categoryContainer = require('../models/categoryContainer')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')
const slugify = require("slugify");

const createCategoryContainer = asyncHandler(async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const newCategoryContainer = await categoryContainer.create(req.body);
        res.json({
            status: "Create Success",
            categoryContainer: newCategoryContainer
        });
    } catch (error) {
        throw new Error(error);
    }
});

const getAllCategoryContainer = asyncHandler(async (req, res) => {
    try {
        const getall = await categoryContainer.find();
        res.json(getall);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCategoryContainer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategoryContainer = await categoryContainer.findByIdAndDelete(id);
        res.json({ status: "Delete Success", categoryContainer: deletedCategoryContainer })
    } catch (error) {
        throw new Error(error);
    }
});

const updateCategoryContainer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const updatedCategoryContainer = await categoryContainer.findByIdAndUpdate({_id : id}, req.body,{
            new: true,
        });
        res.json({status: "Update Success", categoryContainer: updatedCategoryContainer})
    }catch (error) {
        throw new Error(error);
    }
});

const getCategoryContainer = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const getaCategoryContainer = await categoryContainer.findById(id);
        res.json(getaCategoryContainer);
    }
    catch (error) {
        throw new Error(error);
    }
});
module.exports = {
    createCategoryContainer,
    getAllCategoryContainer,
    deleteCategoryContainer,
    updateCategoryContainer,
    getCategoryContainer
};