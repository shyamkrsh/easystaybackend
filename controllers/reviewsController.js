const Listing = require("../models/Listing");
const Review = require("../models/Review");
const User = require("../models/User");
const Notification = require("../models/notifications");


module.exports.createReviews = async (req, res) => {
    try {
        const currUser = await User.findById(req.userId);
        let user = await User.findById(listing.owner);
        const { id } = req.params;
        let listing = await Listing.findById(id);
        const newReviews = new Review({
            content: req.body.content,
            rating: req.body.rating,
            author: currUser,
        })
        let notification = new Notification({
            name: currUser.name,
            content: `${currUser.name} given ${req.body.rating} ⭐ rating on your service - ${listing.title}.`,
        })
        listing.reviews.push(newReviews);
        user.notifications.push(notification);
        await newReviews.save();
        await notification.save();
        await listing.save();
        await user.save();

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