const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const router = express.Router();

require('../models/Order');
const OrderBook = mongoose.model('OrderBook');

/** 😀 create our fonctionnality 😀 */

router.post('/add', (req, res) => {
    var order = new OrderBook({
        UserID: mongoose.Types.ObjectId(req.body.UserID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        deliveryDate: req.body.deliveryDate
    });

    axios.get('http://localhost:8080/ecms/auth/role/' + order.UserID).then((result) => {
        if (result.data == 'student' || result.data == 'trainer') {
            order.save((err, reservation) => {
                if (err) {
                    res.status(500).send(err);
                }
                if (reservation) {
                    axios.get('http://localhost:8080/ecms/user/' + order.UserID).then((user) => {
                        // console.log(user)
                        dataShow = {
                            username: user.data.username,
                            book: '',
                            dateReservation: order.initialDate,
                            deliveryDate: order.deliveryDate
                        };

                        axios.get('http://localhost:3001/ecms/library/book/' + order.BookID).then((book) => {

                            // console.log(book.data)
                            dataShow.book = book.data.title;

                            res.json({
                                message: 'success to reserve book 😄',
                                reservation: dataShow
                            });
                        })
                    })
                }
            })
        } else {
            res.send('unauthorized role 😛')
        }
    })


});

router.get('/', (req, res) => {
    OrderBook.find({}, (err, orders) => {
        if (err) {
            res.status(500).send(err);
        } else {

            console.log(typeof(orders));
            // res.send(orders);
            for (let index = 0; index < orders.length; index++) {
                axios.get('http://localhost:8080/ecms/user/' + orders[index].UserID).then((user) => {
                    console.log(user.data)
                    dataShow[index] = {
                        username: user.data.username,
                        book: '',
                        // dateReservation: orders[index].data.initialDate,
                        // deliveryDate: order[index].data.deliveryDate
                    };

                    axios.get('http://localhost:3001/ecms/library/book/' + orders[index].BookID).then((book) => {

                        // console.log(book.data)
                        dataShow.book = book.data.title;

                        res.json({
                            message: 'our reservation 😄',
                            reservation: dataShow[index]
                        });
                    })
                })
            }


        }
    })
});

router.get('/:id', (req, res) => {

});

router.delete('/delete', (req, res) => {
    return
});




module.exports = router;