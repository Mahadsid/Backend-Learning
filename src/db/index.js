import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected1!!! DB_HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGOBD connection error in DB fldr index.js", error);
        process.exit(1)
    }
}

export default connectDB;