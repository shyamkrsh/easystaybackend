const Contact = require("../models/ContactForm");

module.exports.createNewContact = async (req, res) => {
    try {

        let newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({
            message: "Contact form submitted",
            data: newContact,
            error: false,
            success: true,
        })
    }catch(err){
        res.status(500).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        })
    }
}