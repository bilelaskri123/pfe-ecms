const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    publisher : {
        type : String,
        require : true
    },
    answer : {
        type : String,
        require : true
    },
    cour : {
        type : mongoose.Types.ObjectId
    },

    dateComment : {
        type : Date,
        default : Date.now()
    },
    typeComment : {
        type : String,
    },
    lastComment : {
        type : mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model('Comment', commentSchema);