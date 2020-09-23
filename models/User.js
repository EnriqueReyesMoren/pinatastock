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
    },
    history: {
        type: Array,
        default: []
    },
    publish: {
        type: Array,
        default: []
    },
    portfolio: String,
    address: String,
    phone: Number

}, {
    timestamps: true,
    versionKey: false
});

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);