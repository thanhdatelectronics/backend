const Menu = require("../models/menuModel")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const CreateMenu = asyncHandler(async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const newMenu = await Menu.create(req.body);
        res.json({ status: "Create Success", Menu: newMenu });
    } catch (error) {
        throw new Error(error);
    }


})
const updateMenu = asyncHandler(async(req, res) =>{
    const {id} = req.params
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const menuUp = await Menu.findByIdAndUpdate({_id:id}, req.body,{new: true})
        res.json({status: "Updated Success",Menu: menuUp})
    } catch (error) {
        throw new Error(error);
    }

})
const getAllMenu = asyncHandler(async (req, res) => {
    try {
        const getMenu = await Menu.find();
        res.json({ Menu: getMenu });
    } catch (error) {
        throw new Error(error);
    }
})

const getaMenu = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const get1menu = await Menu.findById({_id : id});
        res.json({Menu : get1menu});
    } catch (error) {
        throw new Error(error);
    }


})

const deleteMenu = asyncHandler( async (req, res)=> {
    const { id } = req.params
    try {
        const delMenu = await Menu.findByIdAndDelete({_id:id})
        res.json({status: "Delete Success", Menu: delMenu})
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { CreateMenu, getAllMenu ,getaMenu,updateMenu,deleteMenu}