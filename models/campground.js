const mongoose = require("mongoose");

//schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    //associating the user with the campgrounds
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    //how you associate data
    //the comments property should be an array of comment IDs. embeding and id or ref to the comments
    comments: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment" 
        } 
    ]
});


//compiling the schema into a model.
module.exports = mongoose.model("Campground", campgroundSchema);

