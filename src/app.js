import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//for form data
app.use(express.json({ limit: "16kb" }))
//for url data
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
//for static files in public folders
app.use(express.static("public"))
//for cookies
app.use(cookieParser())


//routes import

import userRouter from './routes/user.routes.js'

//routes decleration

app.use("/api/v1/users", userRouter)
export { app }