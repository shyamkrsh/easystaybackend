const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./Review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        default: 'available'
    },
    price: {
        type: String || Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    images: [
        {
            url: String,
            filename: String,
        }
    ],
    payment: {
        type: String,
        default: "Pending"
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ]
})

listingSchema.post('findOneAndDelete', async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;



