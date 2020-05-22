const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3012;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/bulltin', {
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

const Bulletin = require('./routes/bulletin.routes');
app.use('/ecms/bulletin', Bulletin);

app.listen(PORT, () => {
    console.log(`Server of payement started on http://localhost:${PORT}`);
});