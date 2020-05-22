const mongoose = require('mongoose');

const payementSchema = mongoose.Schema({
    provider : {
        type : String
    },
    financial : {
        type : String
    },
    datePaiement : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Payement', payementSchema);