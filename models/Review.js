const mongoose = require("mongoose");
const {Schema} = mongoose;

const getFormattedDate = () => {
    const date = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  };

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
        default: getFormattedDate(),
    }
})

const Review = mongoose.model("Review", reviewsSchema);
module.exports = Review;