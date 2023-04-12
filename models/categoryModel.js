const mongoose = require('mongoose');
var categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
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



module.exports = mongoose.model('category', categorySchema);
