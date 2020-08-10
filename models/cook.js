const mongoose = require('mongoose');

const CookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model('Cooks', CookSchema);