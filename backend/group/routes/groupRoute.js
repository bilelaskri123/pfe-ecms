const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

require('../models/Group');
const Group = mongoose.model('Group');

router.post('/', (req, res) => {
    var group = new Group({
        name : req.body.name
    });

    group.save((err, group) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(group);
        }
    });

});

router.put('/:id', (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // var name = '';
            group.student.push(req.body.id);

            group.save((err, newGroup) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(newGroup);
                }
            })

            // axios.get('http://localhost:8080/ecms/user/')
        }
    })
});

router.delete('/:id', (req, res) => {
    Group.deleteOne({_id : req.params.id}, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('group deleted with success !');
        }
    })
});

router.get('/:id', (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(group);
        }
    })
});

module.exports = router;