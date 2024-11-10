const User = require("../models/User");

async function userDetailsController(req, res) {
    try{
        const user = await User.findById(req.userId);
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User Details",
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userDetailsController;