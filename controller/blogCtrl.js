const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const cloudinary = require("../utils/cloudinarys");
const slugify = require("slugify");

const fs = require("fs");

const createBlog = asyncHandler(async (req, res) => {
  try {
    console.log(req.body.title);
    if (req.file != undefined) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "product",
      });
      req.body.imageThumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newBlog = await Blog.create(req.body);
    res.json({ status: "Create Success", blog: newBlog });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const getBlog = await Blog.findById({ _id: id });
  validateMongoDbId(id);
  try {
    if (req.file != undefined) {
      cloudinary.uploader.destroy(
        getBlog[0].imageThumbnail.public_id,
        function (result) {
          console.log(result);
        }
      );
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "product",
      });
      req.body.imageThumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ status: "Update Success", blog: updateBlog });
    } else {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ status: "Update Success", blog: updateBlog });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById({ _id: id });
    //   .populate("likes")
    //   .populate("dislikes");
    // const updateViews = await Blog.findByIdAndUpdate(
    //   id,
    //   {
    //     $inc: { numViews: 1 },
    //   },
    //   { new: true }
    // );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const liketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const searchCategory = async (req, res) => {
  const { keyword } = req.query;
  try {
    const blogs = await Blog.find(
      { title: { $regex: keyword, $options: "i" } }
    );
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const BlogPageSlug = async (req, res) => {
  const { slugs } = req.query;
  console.log(slugs);
  try {
    const blogs = await Blog.find({ slug: slugs });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  BlogPageSlug,
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages,
  searchCategory,
};
