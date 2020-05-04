const mongoose = require('mongoose');

const FormationSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },

    domaine : {
        type : String,
        require : true
    },

    typeClient : {
        type : String
    },

    description : {
        type : String
    },

    location : {
        type : String
    },
    objective : {
        type : String
    },

    prix : {
        type : Number
    },
    contact : {
        type: String
    }

});

module.exports = mongoose.model('Formation', FormationSchema);