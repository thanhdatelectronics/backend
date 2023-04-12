const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const authRouter = require("./routes/authRoute");

const blogRouter = require("./routes/blogRoute");
// const categoryRouter = require("./routes/prodcategoryRoute");
const categoryRouter = require("./routes/categoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const productsRouter = require("./routes/productsRoute");
const linkRouter = require("./routes/linkRoute");
const menuRouter = require("./routes/menuRoute");
const infoRouter = require("./routes/infoWebRoute");
const categoryContainerRouter = require("./routes/categoryContainerRoute");
const feedbackProductRouter = require("./routes/feedbackProductRoute");
const feedbackBlogRouter = require("./routes/feedbackBlogRoute");
const contactRouter = require("./routes/contactRoute");
const companyServiceRoute = require("./routes/companyServiceRoute");
const aboutUsRoute = require("./routes/aboutUsRoute");
const home = require("./routes/homeRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
// app.use("/api/category", categoryRouter);
app.get("/api/test", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/products", productsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/links", linkRouter);
app.use("/api/menu", menuRouter);
app.use("/api/info", infoRouter);
app.use("/api/categorycontainer", categoryContainerRouter);
app.use("/api/feedbackproduct", feedbackProductRouter);
app.use("/api/feedbackblog", feedbackBlogRouter);
app.use("/api/contact", contactRouter);
app.use("/api/company-service", companyServiceRoute);
app.use("/api/home", home);
app.use("/api/about-us", aboutUsRoute);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
