const mongoose = require('mongoose');

var orderScema = mongoose.Schema({
    User: {
        type : mongoose.Types.ObjectId,
        unique : true,
        required : true
    },
    Book: {
        type: mongoose.Types.ObjectId,
        required: true,
       
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