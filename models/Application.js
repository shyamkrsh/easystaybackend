const mongoose = require("mongoose");
const {Schema} = mongoose;

const applicationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;