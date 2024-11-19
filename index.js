require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const data = require("./data.json");
const Listing = require("./models/Listing");
const contactRouter = require("./routes/contactRouter");
const Razorpay = require("razorpay");


main().then((res) => {
    console.log(`Connected to DB`);
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 3000,
    });
}

app.use(cors({
    origin: [
        "https://easystayngp.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))



const userRouter = require("./routes/userRouter");
const listingRouter = require("./routes/listingRouter");
const reviewsRouter = require("./routes/reviewsRouter");
const applicationRouter = require("./routes/applicationRouter");

app.use("/api", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/application", applicationRouter);
app.use("/api/contact", contactRouter);

// payment


const razorpay = new Razorpay({
    key_id: process.env.RAJORPAY_KEY_ID,
    key_secret: process.env.RAJORPAY_SECRET,
});

app.post("/create-order", async (req, res) => {
    try {
        const { amount, currency } = req.body; // Amount in smallest unit (e.g., 100 for ₹1.00)
        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = app;