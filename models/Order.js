const { Schema, model } = require("mongoose");


const CartItemSchema = new Schema({
    asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset"
    },
    name: String,
    price: Number,
    count: Number
}, { timestamps: true });

const CartItem = model("CartItem", CartItemSchema);

const OrderSchema = new Schema({
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Downloaded", "Cancelled"]
    },
    updated: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Order = model("Order", OrderSchema);

module.exports = { Order, CartItem };