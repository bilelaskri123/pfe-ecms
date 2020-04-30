const mongoose = require('mongoose');
const multer = require('multer');
const express = require('express');
const router = express.Router(); 

require('../models/Cour');
const Cour = mongoose.model('Cour');

// set storage 
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads')
    },
    filename : function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage : storage});

var cour = new Cour({
    name : [],
    description : '',
    dateUpload : Date.now(),
})


router.post('/uploadCour',upload.array('myCour', 12), (req, res) => {
    const files = req.files;
    // console.log(files);
    if(!files) {
        const error = new Error('please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    for (let index = 0; index < files.length; index++) {
        cour.names.push(files[index].originalname);
    }

    cour.description = req.body.description;
    cour.save((err, cour) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(cour);
        }
    } )
});


router.get('/all', (req, res) => {
    Cour.find({}, (err, cours) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // console.table(cours);
            res.send(cours)
        }
    })
});

router.delete('/delete', (req, res) => {
    Cour.deleteOne({_id : req.params.id || req.body.id || req.query.id}, (err) => {
        if(err) {
            res.status(500).send(err);
        }

        res.send('cour deleted with success !');
    }) 	
});

router.put('/changeCour', (req, res) => {
    
});


module.exports = router;