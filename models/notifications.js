const mongoose = require("mongoose");
const {Schema} = mongoose;
let date = new Date();  

const notificationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: date.toString(),
    }
})

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;