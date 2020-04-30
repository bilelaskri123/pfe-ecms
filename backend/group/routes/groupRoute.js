const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

require('../models/Group');
const Group = mongoose.model('Group');

router.post('/Group', (req, res) => {
    var group = new Group({
        name : req.body.name,
        student : [mongoose.Types.ObjectId(req.body.student)]
    });

    

});

router.put('/updateGroup', (req, res) => {
     	
});

router.delete('/delete', (req, res) => {
     	
});

router.get('/Group/:id', (req, res) => {
     	
});

module.exports = router;