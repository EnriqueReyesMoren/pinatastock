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
        type: Schema.Types.ObjectId,
        ref: "Category",
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
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true,
    versionKey: false

});

module.exports = model('Asset', AssetSchema);