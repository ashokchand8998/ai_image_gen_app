import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {type: String, reqquired: true},
    prompt: {type: String, reqquired: true},
    photo: {type: String, reqquired: true},
})

const PostSchema = mongoose.model("Post", Post)

export default PostSchema