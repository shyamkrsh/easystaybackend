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
    coordinates: {
        latitude: Number,
        longitude: Number,
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
    ]
})

userSchema.post('findOneAndDelete', async (user) => {
    if (user) {
        await Listing.deleteMany({ _id: { $in: user.owner } });
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;