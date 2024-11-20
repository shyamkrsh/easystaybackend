const Listing = require("../models/Listing");
const User = require("../models/User");
const cloudinary = require('cloudinary').v2;


module.exports.showAllListings = async (req, res) => {
    try {
        const { category } = req.params;
        const listings = await Listing.find({ category: category });
        res.status(200).json({
            message: "Sending Data",
            data: listings,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports.newListing = async (req, res) => {
    try {
        let data = req.body;
        let newListing = new Listing({
            title: data.title,
            category: data.category,
            location: data.location,
            availability: data.availability,
            price: data.price,
            owner: req.userId,
            payment: data.payment,
            description: data.description,
        })
        newListing.images.push({ url: req.files[0].path, filename: req.files[0].filename })
        newListing.images.push({ url: req.files[1].path, filename: req.files[1].filename })
        newListing.images.push({ url: req.files[2].path, filename: req.files[2].filename })
        newListing.images.push({ url: req.files[3].path, filename: req.files[3].filename })

        let user = await User.findById(req.userId);
        if (!user) {
            throw new Error("You can't add Item without logged In");
        }
        user.posts.push(newListing);

        await newListing.save();
        res.status(201).json({
            message: "New Listing Created",
            data: newListing,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }

}

module.exports.showOneListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        const user = await User.findById(listing.owner);

        res.status(200).json({
            message: "Sending Data",
            data: listing,
            owner: user,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            owner: [],
            error: true,
            success: false,
        })
    }

}

module.exports.getAuthorListing = async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.status(200).json({
            message: "Sending Data",
            data: listings,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports.getClients = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("clients");

        res.status(200).json({
            message: "Sending Data",
            data: user,
            error: false,
            success: true,
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        let list = await Listing.findById(id);
        if (list) {
            await cloudinary.uploader.destroy(list.images[0].filename);
            await cloudinary.uploader.destroy(list.images[1].filename);
            await cloudinary.uploader.destroy(list.images[2].filename);
            await cloudinary.uploader.destroy(list.images[3].filename);
            const listing = await Listing.findByIdAndDelete(id);
            res.status(200).json({
                message: "Listing Deleted Successfully",
                data: listing,
                error: false,
                success: true,
            })


        } else {
            throw new Error("Services not exists");
        }


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}

module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    try {
        let data = req.body;
        let updatedListing = await Listing.findOneAndUpdate({ _id: id }, {
            title: data.title,
            category: data.category,
            location: data.location,
            availability: data.availability,
            price: data.price,
            owner: req.userId,
            payment: data.payment,
            description: data.description,
        },
            { new: true },
        )
        updatedListing.images.push({ url: req?.files[0]?.path, filename: req?.files[0]?.filename })
        updatedListing.images.push({ url: req?.files[1]?.path, filename: req?.files[1]?.filename })
        updatedListing.images.push({ url: req?.files[2]?.path, filename: req?.files[2]?.filename })
        updatedListing.images.push({ url: req?.files[3]?.path, filename: req?.files[3]?.filename })

        await updatedListing.save();
        res.status(200).json({
            message: "Listing Updated successfully",
            data: updatedListing,
            error: false,
            success: true,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}
