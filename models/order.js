const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
