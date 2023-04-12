const Contact = require('../models/contactModel');
const asyncHandler = require('express-async-handler');

const createContact = asyncHandler(async (req, res) => {
    try {
        const createdContact = await Contact.create(req.body);
        res.json({status:"Create Success", createdContact});
    }catch(error) {
        throw new Error(error);
    }
});

const getAllContact = asyncHandler(async (req, res) => {
    try{
        const allContact  = await Contact.find();
        res.json(allContact);
    }catch(error) {
        throw new Error(error);
    }
});
const getAContast = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const getContact = await Contact.findById({_id: id});
        res.json(getContact);
    }catch(error) {
        throw new Error(error);
    }
});
const deleteContact = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const deletedContact = await Contact.findByIdAndDelete({_id:id});
        if (deletedContact == null) {
            res.json({ status: "Contact not found" });
        } else {
            res.json({ status: "Delete Success", deletedContact });
        }
    }catch(error) {
        throw new Error(error);
    }
});
module.exports = {
    createContact,
    getAllContact,
    getAContast,
    deleteContact,
}