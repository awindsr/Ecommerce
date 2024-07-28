// models/Cart.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Cart schema
const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, {
    timestamps: true
});

// Create the Cart model using the Cart schema
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
