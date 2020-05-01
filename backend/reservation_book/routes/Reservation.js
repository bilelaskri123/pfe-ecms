const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/Order');
const OrderBook = mongoose.model('OrderBook');

/** 😀 create our fonctionnality 😀 */

router.post('/add', (req, res) => {
    var order = new OrderBook({
        UserID : mongoose.Types.ObjectId(req.body.UserID),
        BookID : mongoose.Types.ObjectId(req.body.BookID),
        deliveryDate : req.body.deliveryDate
    });

    
});

router.get('/', (req, res) => {
     	
});

router.get('/:id', (req, res) => {
     	
});

router.delete('/delete', (req, res) => {
return 	
});




module.exports = router;