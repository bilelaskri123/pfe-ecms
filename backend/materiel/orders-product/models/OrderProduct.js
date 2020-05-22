const mongoose = require('mongoose');

const orderProductSchema = mongoose.Schema({
    
    provider : {
        type : String,
        require : true
    },
    financial :{
        type : String,
        require : true
    },
    product : {
        type : String,
        require : true
    },
    number : {
        type : Number,
        require : true
    },
    prix : {
        type: Number,

    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('OrderProduct', orderProductSchema);