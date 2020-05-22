const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3011;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/orderProduct', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success to connect to database');
    }
});

/** require our routes  */

const OrderProduct = require('./routes/orderProduct.routes');
app.use('/ecms/order/product', OrderProduct);

app.listen(PORT, () => {
    console.log(`Server of orderProduct started on http://localhost:${PORT}`);
});