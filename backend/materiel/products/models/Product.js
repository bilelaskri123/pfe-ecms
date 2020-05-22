const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    image : {
        type : String
    },
    description : {
        type : String
    }
})

module.exports = mongoose.model('Product',productSchema);