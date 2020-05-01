const mongoose = require('mongoose');

var orderScema = mongoose.Schema({
    UserID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref : 'User'
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref : 'Book'
    },
    initialDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('OrderBook', orderScema);