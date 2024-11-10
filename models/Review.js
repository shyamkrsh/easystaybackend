const mongoose = require("mongoose");
const {Schema} = mongoose;


const reviewsSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now().toString(),
    }
})

const Review = mongoose.model("Review", reviewsSchema);
module.exports = Review;