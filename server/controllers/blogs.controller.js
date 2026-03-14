import fs from "fs";
import client from "../configs/imagekit.js";
import blogModel from "../models/blogs.model.js";
import commentModel from "../models/comments.model.js";
import { main } from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;
    // console.log("Image file", imageFile);
    // console.log(title, description, category, isPublished)
 
    if (!title || !description || !category || !imageFile || !isPublished) {
        return res.json({ success: false, message: "Missing required fields!" });
    }

    const response = await client.files.upload({
        file: fs.createReadStream(imageFile.path),
        fileName: imageFile.originalname,
        folder: "/blogs",
    });

    const transformedUrl = client.helper.buildSrc({
        urlEndpoint: `https://ik.imagekit.io/${process.env.IMAGEKIT_ID}`,
        src: response.filePath,
        transformation: [
            {
            width: 1280,
            quality: "auto",
            format: "webp",
            },
        ],
    });

    const image = transformedUrl;

    const blog = await blogModel.create({title, subTitle, description, category, image, isPublished})
    // console.log(blog)
    return res.json({success: true, message: "Blog added successfully!"})
    } 
  
    catch (error) {
        return res.json({success: false, message: error.message})
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({isPublished: true})
        return res.json({success: true, blogs})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        // console.log(blogId)
        const blog = await blogModel.findById(blogId)
        if(!blog) {
            return res.json({success: false, message: "Blog not found!"})
        }
        return res.json({success: true, blog})
    } catch (error) {
        // return res.json({success: false, message: error.message})
        return res.json({success: false, message: error.message, FN: "getBlogById"})
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        // console.log(id)
        await blogModel.findByIdAndDelete(id)

        // Delete all comments associated with the blog
        await commentModel.deleteMany({blog: id})

        return res.json({success: true, message: "Blog deleted successfully!"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req, res) => {
    try {
        const {id} = req.body;
        // console.log("ID",id)
        const blog = await blogModel.findById(id)
        blog.isPublished = !blog.isPublished
        blog.save()
        return res.json({success: true, message: "Blog status updated!"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body
        await commentModel.create({blog, name, content})
        return res.json({success: true, message: "Comment added for review!"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getBlogComment = async (req, res) => {
    try {
        const {blogId} = req.params
        // console.log(blogId)
        const comments = await commentModel.find({blog: blogId, isApproved: true}).sort({createdAt: -1})
        return res.json({success: true, comments})
    } catch (error) {
        return res.json({success: false, message: error.message, FN: "getBlogcomment"})
    }
} 

export const generateDescription = async (req, res) => {
    try {
        const {prompt} = req.body
        
        const description = await main(prompt + "Generate a blog content for this topic in simple text format..")
        return res.json({success: true, description})
    } catch (error) {
        return res.json({success: false, message: error.message, FN: "generateDescription"})
    }
} 

