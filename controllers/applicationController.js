const Listing = require("../models/Listing");
const Application = require("../models/Application");
const User = require("../models/User");

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
        await application.save();
        user.clients.push(application._id);
        await user.save();
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