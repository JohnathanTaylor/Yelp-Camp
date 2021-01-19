const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //refers to the model we are refering to with the object id
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);