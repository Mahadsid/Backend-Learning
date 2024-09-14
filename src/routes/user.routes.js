import { Router } from "express";   
import { registerUser } from "../controllers/user.controller.js";
import {uploadMulter} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    uploadMulter.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)


export default router;