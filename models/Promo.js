const { Schema, model } = require('mongoose');


const PromoSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,

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

    status: {
        type: String,
        enum: ["active", "finished"],
        default: "active"
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/hito-negro/image/upload/v1601444521/Assets/street-food_t20_WKW1kK_gvvb8j.jpg"

    },
    business: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: "Participant"
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "Participant"
    }]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model("Promo", PromoSchema);