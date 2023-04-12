const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    idCategoriesContainer: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
  }
);

//Export the model
module.exports = mongoose.model("Brand", brandSchema);
