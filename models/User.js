const mongoose = require("mongoose");
const Listing = require("./Listing");
const { Schema } = mongoose;

const userSchema = new Schema({
    profileImage: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing",
        }
    ],
    clients: [
        {
            type: Schema.Types.ObjectId,
            ref: "Application",
        },
    ],
    reports: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Report',
        }
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification',
        }
    ]
 
})

userSchema.post('findOneAndDelete', async (user) => {
    if (user) {
        await Listing.deleteMany({ _id: { $in: user.owner } });
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;