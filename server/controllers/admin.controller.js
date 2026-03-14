import jwt from 'jsonwebtoken'
import blogModel from '../models/blogs.model.js'
import commentModel from '../models/comments.model.js'

export const admin_login = async (req, res) => {
    const {email, password} = req.body
    if (email !== process.env.ADMIN_EMAIL_ID || password !== process.env.ADMIN_PASSWORD) {
        return res.json({success: false, message:"Invalid admin credentials!"})
    }

    const token = jwt.sign(email,process.env.SECRET_KEY)
    return res.json({success:true, token})
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).sort({createdAt: -1})
        return res.json({success:true, blogs})
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

export const getAllCommentsAdmin = async (req, res) => {
    try {
        const comments = await commentModel.find({}).populate("blog").sort({createdAt: -1})
        return res.json({success:true, comments})
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await blogModel.find({}).sort({createdAt: -1}).limit(5)
        const blogs = await blogModel.countDocuments({})
        const comments = await commentModel.countDocuments({})
        const drafts = await blogModel.countDocuments({isPublished: false})
            
        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }
        return res.json({success:true, dashboardData})
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        console.log(id)
        await commentModel.findByIdAndDelete(id)
        return res.json({success: true, message: "Comment deleted successfully!"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await commentModel.findByIdAndUpdate(id, {isApproved: true})
        return res.json({success: true, message: "Comment approved successfully!"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}