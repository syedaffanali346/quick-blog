import mongoose from "mongoose";

const db_connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`)
        console.log("Mongo db database connected!")
    } catch (error) {
        console.log("Database connection error!",error.message)
    }
}

export default db_connect