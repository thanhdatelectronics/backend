const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const categoryContainer = require("../models/categoryContainer");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ status: "Update Success", Brand: updatedBrand });

  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json({ status: "Delete Success", Brand: deletedBrand });
  } catch (error) {
    throw new Error(error);
  }
});
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBrand = asyncHandler(async (req, res) => {
  try {
    const getallBrand = await Brand.find();
    res.json(getallBrand);
  } catch (error) {
    throw new Error(error);
  }
});


const fiterCTNBySlugBrand = asyncHandler(async (req, res) => {
  const { slug } = req.query; // lấy danh sách category đã chọn

  try {

    const fcategoryctn = await categoryContainer.find({ slug: slug })
    console.log(fcategoryctn[0]._id.toHexString());
    const Brands = await Brand.find({ idCategoriesContainer: fcategoryctn[0]._id.toHexString() })
    res.json(Brands);

  } catch (error) {
    throw new Error(error);
  }
})
module.exports = {
  fiterCTNBySlugBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
};
