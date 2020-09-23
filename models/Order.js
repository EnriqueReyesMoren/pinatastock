const { Schema, model } = require("mongoose");


const CartItemSchema = new Schema({
    product: { type: ObjectId, ref: "Asset" },
    name: String,
    price: Number,
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
    user: { type: ObjectId, ref: "User" }
}, { timestamps: true });

const Order = model("Order", OrderSchema);

module.exports = { Order, CartItem };