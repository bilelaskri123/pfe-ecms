const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/** require notre model  */
require('../models/Bulletin');
const Bulletin = mongoose.model('Bulletin');

router.post('/', (req, res) => {
    
});

router.get('/:id', (req, res) => {
    
});

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    
});


module.exports = router;