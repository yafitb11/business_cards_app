const mongoose = require("mongoose");
const addressSchema = require("../../../mongoose validation generals/Adress");
const imageSchema = require("../../../mongoose validation generals/Image");
const { URL, DEFAULT_VALIDATION } = require("../../../mongoose validation generals/urlAndDefaultValidations");
const nameSchema = require("./Name");

const userSchema = new mongoose.Schema({

    name: nameSchema,
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
        unique: true,
    },
    password: {
        type: String,
        match: RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-*&^%$#@!]).{9,}$/),
        required: true,
    },
    image: imageSchema,
    addrees: addressSchema,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;