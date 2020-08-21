const mongoose = require('mongoose');

const CookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String
    },
    worktime: {
        type: Number
    },
    ingredients: {
        type: Array
    }
});

module.exports = mongoose.model('Cooks', CookSchema);