const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3017;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/session', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success to connect to database');
    }
});

const Session = require('./routes/session.routes');
app.use('/ecms/session', Session);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});