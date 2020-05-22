const mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    // title, auther, numberPages, publisher

    title : {
        type : String,
        require : true
    },
    
    auther : {
        type : String,
        require : true
    },

    numberPages : {
        type : String,
        require : false
    },

    publisher : {
        type : String,
        require : false
    },
    description : {
        type : String
    },
    image : {
        type : String,
        require : false
    }
});

module.exports = mongoose.model('Book',BookSchema);

