import express from 'express'
import { admin_login, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard } from '../controllers/admin.controller.js'
import auth from '../middlewares/auth.js'
const route = express.Router()

route.post("/login", admin_login)
route.get("/allcomments", auth, getAllCommentsAdmin)
route.get("/allblogs", auth, getAllBlogsAdmin)
route.post("/deletecomment", auth, deleteCommentById)
route.post("/approvecomment", auth, approveCommentById)
route.get("/dashboard", auth, getDashboard)

export default route