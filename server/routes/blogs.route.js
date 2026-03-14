import express from 'express'
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'
import { addBlog, addComment, deleteBlogById, generateDescription, getAllBlogs, getBlogById, getBlogComment, togglePublish } from '../controllers/blogs.controller.js'
const route = express.Router()

route.post("/addblog", upload.single("image"), auth, addBlog)
route.get("/allblogs", getAllBlogs)
route.get("/:blogId", getBlogById)
route.post("/deleteblog", auth, deleteBlogById)
route.post("/togglepublish", auth, togglePublish)

route.post("/addcomment", addComment)
route.get("/comments/:blogId", getBlogComment)
route.post("/generatedesc", generateDescription)

export default route