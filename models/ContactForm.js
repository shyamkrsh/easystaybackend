const mongoose = require("mongoose");
const {Schema} = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

