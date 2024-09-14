import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from '../utils/ApiResponse.js'


//register user 
const registerUser = asyncHandler(async (req, res) => {
    //get user detail from frontend
    //validation - not empty
    //check if user already exist : username, email
    //check for images, check for avatar
    //upload them for cloudinary, {check: avtar}
    //crate user object- create entry in db
    //remove password and refresh token field from above response
    //check for user creation
    //return res

    //not empty check
    const { fullName, email, username, password } = req.body
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //if user already exist check
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    //bcz of middleware we get things in req.files and with multer middleware we get access tp avatar (and name avatar bcz we named it in routes so this shoud be equal) then took its first property then path, optional chaining is good practice
    //till here file is in our local server multer put/took it from loacl destination (check multer milldeware)

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    //avatar check
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //upoad on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    //again check for avatar uploaded successfully or not
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //create user object & store to db

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    //check if user is created or not
    //we can check with if cond, but better approach is another db call with new userid to find it. downside is another db call
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user.")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})


export {registerUser}