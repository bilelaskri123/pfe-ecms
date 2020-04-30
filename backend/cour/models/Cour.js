const mongoose = require('mongoose');

var courSchema = mongoose.Schema({
    names : [{
        type : String
    }],
    description : 
    {
        type : String
    },
    dateUpload : {
        type : Date,
        default : Date.now()
    },
    trainer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    group : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
        
    }

});

module.exports = mongoose.model('Cour', courSchema);