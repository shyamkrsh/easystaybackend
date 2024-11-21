const Listing = require("../models/Listing");
const Application = require("../models/Application");
const User = require("../models/User");
const {appliedEmail} = require("../middleware/appliedEmail");

module.exports.newApplication = async (req, res) => {
    try {
        const { id } = req.params;
        let listing = await Listing.findById(id);
        let user = await User.findById(listing.owner);
        let application = new Application({
            name: req.body.name,
            email: req.body.email,
            mobNumber: req.body.mobNumber,
            location: req.body.location,
            author: req.userId,
        })
        let notification = new Notification({
            name: req.body.name,
            content: `${req.body.name} is booking your service - ${listing.title} please see their details on you dashboard's clients section.`,
        })
        await application.save();
        user.clients.push(application._id);
        user.notifications.push(notification._id);
        await user.save();
        appliedEmail(req.body.email, name, listing.title, listing.price);
        res.status(201).json({
            message: "New Application created",
            data: application,
            error: false,
            success: true,
        })
    }catch(err){
        res.json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}