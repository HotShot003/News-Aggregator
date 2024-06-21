const mongoose = require("mongoose") ;

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        trim: true
    },
    about: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    }
}) ;

module.exports = mongoose.model("Profile", profileSchema) ;