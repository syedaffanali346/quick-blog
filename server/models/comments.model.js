import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {type:mongoose.Schema.Types.ObjectId, ref:"blog", required:"This field is required!"},
    name: {type:String, required:"This field is required!"},
    content: {type:String, required:"This field is required!"},
    isApproved: {type:Boolean, default:false},
}, {timestamps:true})

const commentModel = mongoose.model("comment", commentSchema)

export default commentModel