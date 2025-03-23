const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required'],
    },
    description: {
        type: String,
        trim: true, //this trim will remove extra spaces 
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag', // Reference to the Tag model
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
