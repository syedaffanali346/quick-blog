import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.headers.authorization
    // console.log("token",token)
    // console.log("req.headers",req.headers)
    // console.log("req.headers.authorization",req.headers.authorization)
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY)
    next()
}

export default auth