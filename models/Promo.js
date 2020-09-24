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

    status: {
        type: String,
        enum: ["active", "finished"],
        default: "active"
    },
    photo: {
        type: String,

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