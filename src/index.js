import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

//FIRST WAY TO USE IMPORT EXPORT
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is runnung at port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb connection failed from index.js calling", err)
    })

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