const { Schema, model } = require('mongoose');


const AssetSchema = new Schema({
    name: {
        type: String,
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
        required: true,
        maxlength: 32
    },
    category: {
        type: String
    },
    photo: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    valid: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    versionKey: false

});

module.exports = model('Asset', AssetSchema);