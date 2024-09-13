import connectDB from "./db/index.js";
import dotenv from "dotenv"

//FIRST WAY TO USE IMPORT EXPORT
connectDB()

dotenv.config({
    path: './env'
})

/*
SECOND WAY TO CONNECT DATABASE USING EFFI FUNCTION SYNTAX
import express from "express";
const app = express()
//effi function
(async () => {
    try {
        await mongoose.connect(`${process_params.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERR in indexjs at app.on", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("Error", error)
        throw error
    }
})()
*/