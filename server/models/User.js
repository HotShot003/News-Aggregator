const mongoose = require("mongoose") ;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    bookmarkedNews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookmark"
    },
    image: {
        type: String,
        required: true
    }
}) ;

module.exports = mongoose.model("User", userSchema) ;