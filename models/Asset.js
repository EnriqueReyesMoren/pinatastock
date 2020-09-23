const { Schema, model } = require('mongoose');


const AssetSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        type: Number,
        default: 30
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model("Asset", AssetSchema);