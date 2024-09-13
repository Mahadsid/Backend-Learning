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

export { app }