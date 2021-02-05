const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
});

const Post = mongoose.model("message", schema);

module.exports = Post;
