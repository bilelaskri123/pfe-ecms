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

                    dataShow = {
                        username: '',
                        book: '',
                        dateReservation: '',
                        deliveryDate: ''
                    }

                    axios.get('http://localhost:8080/ecms/user/' + reservation.UserID).then((user) => {
                        // console.log(user)

                        dataShow.username = user.data.username,
                            // dataShow.book: '',
                            dataShow.dateReservation = order.initialDate,
                            dataShow.deliveryDate = order.deliveryDate


                        axios.get('http://localhost:3001/ecms/library/book/' + reservation.BookID).then((book) => {

                            // console.log(book.data)
                            dataShow.book = book.data.title;

                            res.send(dataShow);
                        });
                    });
                }
            })
        } else {
            res.send('unauthorized role 😛')
        }
    })


});

reservation = (req, res, next) => {
    var reservation = [];

    OrderBook.find({}, (err, orders) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // console.log(orders);
            orders.forEach(order => {
                var data = {
                    username: '',
                    book: '',
                    dateReservation: '',
                    deliveryDate: ''
                };

                axios.get('http://localhost:8080/ecms/user/' + order.UserID).then((user) => {
                    axios.get('http://localhost:3001/ecms/library/book/' + order.BookID).then((book) => {
                        data.username = user.data.username;
                        data.dateReservation = order.initialDate;
                        data.deliveryDate = order.deliveryDate;
                        data.book = book.data.title;

                        reservation.push(data);
                        return reservation;

                    });
                });
            });
        }
    });
};

router.get('/test', (req, res) => {
    var data = reservation();
    console.log(data);
    res.send('test');
});

router.get('/', (req, res) => {
    OrderBook.find({}, (err, orders) => {
        if (err) {
            res.status(500).send(err);
        } else {


            var reservation = [];
            dataShow = {
                username: '',
                book: '',
                dateReservation: '',
                deliveryDate: ''
            };

            orders.forEach(order => {
                axios.get('http://localhost:8080/ecms/user/' + order.UserID).then((user) => {

                    axios.get('http://localhost:3001/ecms/library/book/' + order.BookID).then((book) => {
                        dataShow.username = user.data.username;
                        dataShow.dateReservation = order.initialDate;
                        dataShow.deliveryDate = order.deliveryDate;
                        dataShow.book = book.data.title;
                        // console.log(dataShow);
                        reservation.push(dataShow);

                    });
                    console.log(dataShow);
                });
            });
            console.log(reservation);
        }
    })
});

router.get('/:id', (req, res) => {
    OrderBook.findById(req.params.id, (err, order) => {

        if (err) {
            res.status(500).send(err);
        } else {
            var dataShow = {
                username: '',
                book: '',
                dateReservation: '',
                deliveryDate: ''
            };

            axios.get('http://localhost:8080/ecms/user/' + order.UserID).then((user) => {

                axios.get('http://localhost:3001/ecms/library/book/' + order.BookID).then((book) => {
                    dataShow.username = user.data.username;
                    dataShow.dateReservation = order.initialDate;
                    dataShow.deliveryDate = order.deliveryDate;
                    dataShow.book = book.data.title;

                    res.send(dataShow);
                });
            });
        }
    })
});

router.delete('/:id', (req, res) => {
    OrderBook.deleteOne({_id : req.params.id}, ((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('reservation deleted with success 😉');
        }
    }))
});




module.exports = router;