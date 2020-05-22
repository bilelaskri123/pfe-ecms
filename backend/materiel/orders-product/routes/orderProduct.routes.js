const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

require('../models/OrderProduct');
const OrderProduct = mongoose.model('OrderProduct');

router.post('/post', (req, res) => {
    idPrivider = req.body.idProvider;
    idfinancial = req.body.idfinancial;

    axios.get('')
});

router.get('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
	
});

router.put('/:id', (req, res) => {
 	
});




module.exports = router;