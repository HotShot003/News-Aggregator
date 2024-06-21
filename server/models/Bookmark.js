const mongoose = require("mongoose") ;

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        required: true
    }
}) ;

module.exports = mongoose.model("Bookmark", bookmarkSchema) ;