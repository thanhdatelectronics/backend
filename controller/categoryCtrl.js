const Category = require("../models/categoryModel");
const Products = require("../models/productsModel");
const asyncHandler = require("express-async-handler");
const categoryContainer = require("../models/categoryContainer");

const createCategory = asyncHandler(async (req, res) => {

    try {
        const newCategory = await Category.create(req.body);
        res.json({ status: "Create Success", category: newCategory });
    } catch (error) {
        throw new Error(error)
    }

})

const updateCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    console.log(id);
    try {
        const updateCategory = await Category.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.json({ status: 'Update Success', category: updateCategory })
    } catch (error) {
        throw new Error(error);
    }

});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await Category.findByIdAndDelete({ _id: id });
        if (deleteCategory == null) {
            res.json({ status: "Category not found" })
        } else {
            res.json({ status: "Delete success", category: deleteCategory })
        }
    } catch (error) {
        throw new Error(error);
    }

});

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getCategory = await Category.find();
        res.json({ category: getCategory });
    } catch (error) {
        throw new Error(error);
    }
});

const getaCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const count = await Products.countDocuments({ idCategory: id });
        const findCategory = await Category.findById({ _id: id });
        res.json({ category: findCategory, totalProductInCategory: count });
    } catch (error) {
        throw new Error(error);
    }
});

const fiterCTNBySlugCate = asyncHandler(async (req, res) => {
    const { slug } = req.query; // lấy danh sách category đã chọn
    
    try {

        const fcategoryctn = await categoryContainer.find({ slug: slug })
        console.log(fcategoryctn[0]._id.toHexString());
        const Categorys = await Category.find({ idCategoriesContainer: fcategoryctn[0]._id.toHexString() })
        res.json(Categorys);

    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {fiterCTNBySlugCate, createCategory, updateCategory, deleteCategory, getAllCategory, getaCategory }
