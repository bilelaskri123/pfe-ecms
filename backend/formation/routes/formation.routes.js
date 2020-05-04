const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Formation');
const Formation = mongoose.model('Formation');

router.post('/', (req, res) => {
    var formation = new Formation({
        name : req.body.name ,
        domaine : req.body.domaine,
        typeClient : req.body.typeClient ,
        description : req.body.description,
        location : req.body.location,
        objective : req.body.objective,
        prix : req.body.prix,
        contact : req.body.contact
    });


    // console.log(formation);

    formation.save((err, formation) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                message : 'formation added with success 😄',
                data : formation
            });
        }
    });
});

router.get('/', (req, res) => {
    Formation.find({}, (err, formations) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                message : 'formation list',
                formation : formations
            });
        }
    });
});

router.get('/:id', (req, res) => {
    Formation.findById(req.params.id, (err, formation) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                formation : formation
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    Formation.deleteOne({_id : req.params.id}, (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send('formation deleted with success 😉');
    })
});


router.put('/:id', (req, res) => {
    Formation.updateOne({_id : req.params.id}, req.body, (err, newFormation) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                newFormation : newFormation
            });
        }
    });
});

module.exports = router;