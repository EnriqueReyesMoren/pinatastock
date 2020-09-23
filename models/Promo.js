const { Schema, model } = require('mongoose');


const PromoSchema = new Schema({
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
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "finished"],
        default: "active"
    },
    photo: {
        type: String,

    }
}, { timestamps: true });

module.exports = model("Promo", PromoSchema);