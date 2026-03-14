import "dotenv/config"
import express from 'express'
import cors from "cors"
import db_connect from "./configs/db_connection.js"
import adminRoute from "./routes/admin.route.js"
import blogRoute from "./routes/blogs.route.js"

const app = express()
await db_connect()

// Middlewares
app.use(cors())
app.use(express.json())

// Admin Routes
app.use("/api/admin", adminRoute)

// Blog Routes
app.use("/api/blog", blogRoute)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`server is running on port ${process.env.PORT}`)
})

export default app;