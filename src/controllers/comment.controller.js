import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    //extract video id from params
    //extract extra info from query
    //use aggregate pipelines to get all comments
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    //if not valid video id
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video")
    }

    let pipeline = [
    {
        $match: {
            video: new mongoose.Types.ObjectId(videoId),
        },
    },
    {
        $lookup: {
            from: "users",
            localField: "owner", // Assuming `owner` is the user who made the comment
            foreignField: "_id",
            as: "details",
            pipeline: [
                {
                    $project: {
                        fullname: 1,
                        avatar: 1,
                        username: 1,
                    },
                },
            ],
        },
    },
    {
        $lookup: {
            from: "likes",
            localField: "_id", // Assuming `comment._id` is linked with likes
            foreignField: "comment", // Assuming `comment` is the field in the `likes` collection
            as: "likes",
        },
    },
    {
        $addFields: {
            details: { $first: "$details" }, // Pick the first entry from `details` array
        },
    },
    {
        $addFields: {
            likes: { $size: "$likes" }, // Count the number of likes
        },
    },
];

const options = {
    page: parseInt(page), // Current page number
    limit: parseInt(limit), // Limit per page
    customLabels: {
        totalDocs: "total_comments", // Rename `totalDocs` to `total_comments`
        docs: "Comments", // Rename `docs` to `Comments`
    },
};

// Using aggregatePaginate to handle both aggregation and pagination
const allComments = await Comment.aggregatePaginate(pipeline, options);

// Error handling if no comments are found
if (allComments?.total_comments === 0) {
    throw new ApiError(400, "Comments not found");
}

// Return the paginated enriched response
return res.status(200).json(
    new ApiResponse(200, {
        Comments: allComments.Comments,
        totalComments: allComments.total_comments, // Total number of comments
        size: allComments.Comments.length, // Number of comments in the current page
    })
);

    






})