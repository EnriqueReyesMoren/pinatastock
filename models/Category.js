const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    asset:[{
        type: Schema.Types.ObjectId,
        ref: "Asset"
    }]
}, { timestamps: true });

module.exports = model("Category", categorySchema);