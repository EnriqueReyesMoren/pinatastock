const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    email: String,
    name: String,
    description: {
        type: String,
        trim: true,
        maxlength: 128
    },
    facebookId: String,
    googleId: String,
    role: {
        type: String,
        enum: ["admin", "user", "creator", "business"],
        default: 'user',
    },
    history: {
        type: Array,
        default: []
    },
    publish: [{
        type: Schema.Types.ObjectId,
        ref: "Asset"

    }],
    promos: [{
        type: Schema.Types.ObjectId,
        ref: "Promo"

    }],

    contender: [{
        type: Schema.Types.ObjectId,
        ref: "Participant"

    }],

    portfolio: String,
    address: String,
    phone: Number

}, {
    timestamps: true,
    versionKey: false
});

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);