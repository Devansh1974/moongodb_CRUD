const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Tag', TagSchema);