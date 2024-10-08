const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
    contact: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema);
