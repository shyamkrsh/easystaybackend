const Listing = require("../models/Listing");
const Review = require("../models/Review");
const User = require("../models/User");


module.exports.createReviews = async (req, res) => {
    try {
        const currUser = await User.findById(req.userId);
        const { id } = req.params;
        const newReviews = new Review({
            content: req.body.content,
            rating: req.body.rating,
            author: currUser,
        })
        let listing = await Listing.findById(id);
        listing.reviews.push(newReviews);
        await newReviews.save();
        await listing.save();

        res.status(200).json({
            message: "Review Created successfully",
            data: newReviews,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }

}
module.exports.showReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
        if(!listing){
            throw new Error("No such reviews created");
        }
        res.status(200).json({
            message: "Sending Data",
            data: listing,
            error: false,
            success: true,
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}