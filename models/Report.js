const mongoose = require("mongoose");
const {Schema} = mongoose;

const reportSchema = new Schema({
    issue: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now().toLocaleString(),
    }
})

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;