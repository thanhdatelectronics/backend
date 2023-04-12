const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    doc: {
        type: Object,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }

})

module.exports = mongoose.model("Menu", MenuSchema)