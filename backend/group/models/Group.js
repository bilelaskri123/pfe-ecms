const mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    student :[
        {
            type : mongoose.Types.ObjectId,
            ref : 'User',
            default : []
        }
    ]
})

module.exports = mongoose.model('Group', groupSchema);