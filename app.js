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
  origin: ['https://easystayngp.vercel.app'],
  methods: ["get", "post", "put", "delete"],
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))



const userRouter = require("./routes/userRouter");
const listingRouter = require("./routes/listingRouter");
const reviewsRouter = require("./routes/reviewsRouter");
const applicationRouter = require("./routes/applicationRouter");

app.use("/api", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/application", applicationRouter);
app.use("/api/contact", contactRouter);




app.listen(PORT, () => {
    console.log(`App is listeing to the port : ${PORT}`);
})
