const mongoose = require("mongoose");
const addressSchema = require("../../../mongoose validation generals/Adress");
const imageSchema = require("../../../mongoose validation generals/Image");
const { URL, DEFAULT_VALIDATION } = require("../../../mongoose validation generals/urlAndDefaultValidations");

const cardSchema = new mongoose.Schema({

    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    },
    phone: {
        type: String,
        match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
        required: true,
    },
    email: {
        type: String,
        match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
        required: true,
        lowercase: true,
        trim: true,
    },
    web: URL,
    image: imageSchema,
    addrees: addressSchema,
    bizNumber: {
        type: Number,
        minLength: 1,
        maxLength: 9,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    likes: [String],
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;