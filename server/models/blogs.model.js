import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type:String, required:"This field is required!"},
    subTitle: {type:String},
    description: {type:String, required:"This field is required!"},
    category: {type:String, required:"This field is required!"},
    image: {type:String, required:"This field is required!"},
    isPublished: {type:Boolean, required:"This field is required!"},
}, {timestamps:true})

const blogModel = mongoose.model("blog", blogSchema)

export default blogModel