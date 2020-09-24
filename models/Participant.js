const { Schema, model } = require("mongoose")

const participantSchema = new Schema({
        creative: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        promo: {
            type: Schema.Types.ObjectId,
            ref: "Promo"
        },
        winner: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }

)

module.exports = model("Participant", participantSchema)