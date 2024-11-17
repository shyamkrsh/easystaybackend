const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../middleware/sendMail");
// const {forgetMail} = require("../middleware/forgetMail")
const Listing = require("../models/Listing");




module.exports.signup = async (req, res) => {
    try {
        let { profileImage, name, email, mobNumber, password } = req.body;
        if (!name) {
            throw new Error("Name is missing");
        }
        if (!email) {
            throw new Error("Email is missing");
        }
        if (!mobNumber) {
            throw new Error("Mobile number is missing");
        }
        if (!password) {
            throw new Error("Password is missing");
        }
        const user = await User.findOne({ $or: [{ email: email }, { mobNumber: mobNumber }] })
        if (user) {
            throw new Error("User Already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        let newUser = new User({ profileImage: req.file ? req.file.path : null, name: name, email: email, mobNumber: mobNumber, password: hashPassword });
        await newUser.save().then(() => {
            req.user = newUser;
            sendMail(newUser.email, newUser.name, "Welcome to EasyStay !");
            res.status(201).json({
                message: "Signup successfully",
                data: newUser,
                error: false,
                success: true,
            });;
        }).catch((err) => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: err.message || err,
            error: true,
            suceess: false,
        })
    }

}

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path to your User model as needed

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request data
        if (!email) {
            return res.status(400).json({ 
                message: "Email is required", 
                error: true, 
                success: false 
            });
        }
        if (!password) {
            return res.status(400).json({ 
                message: "Password is required", 
                error: true, 
                success: false 
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                message: "User not registered", 
                error: true, 
                success: false 
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Invalid password", 
                error: true, 
                success: false 
            });
        }

        // Generate JWT token
        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, "mysecretjwt" || "mysecretStringyoucantchanged", {
            expiresIn: "7d", // 7 days
        });

        // Cookie options
       
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        };

        // Set the cookie and send response
        res.cookie("token", token, cookieOptions).status(200).json({
            message: "Login successful",
            data: { token }, // Token is also sent in response for convenience
            success: true,
            error: false,
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "An error occurred during login",
            error: true,
            success: false,
        });
    }
};


module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', { path: '/', httpOnly: true, secure: true, sameSite: 'None' });
        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: [],
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred during logout",
            error: true,
            success: false,
        });
    }
};

module.exports.forgetPassword = async (req, res) => {
    try {
        let { email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User not registered");
        }
        let currPassword = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(currPassword, salt);
        forgetMail(user.email, user.name, currPassword, `https://easystayngp.vercel.app/api/changePassword/${user._id}`);
        user.password = hashPassword;
        await user.save();

        res.status(200).json({
            message: "Password Changed successfully",
            data: user,
            error: false,
            success: true,
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        let { id } = req.params;
        let { email, oldpassword, newpassword } = req.body;

        let user = await User.findById(id);
        if (!user) {
            throw new Error(401, "UnAuthorized access");
        }

        const checkPassword = await bcrypt.compare(oldpassword, user.password);
        if (!checkPassword) throw new Error("Please check Password");

        if (checkPassword) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(newpassword, salt);
            user.password = hashPassword;
            await user.save().then(() => {
                res.status(200).json({
                    message: "Password changed successfully",
                    data: user,
                    error: false,
                    success: true,
                })
            })
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }

}