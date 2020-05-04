const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3005;

/**configure body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// enabling cors 
app.use(cors());

mongoose.connect('mongodb://localhost:27017/abscences', {
    useNewUrlParser : true,
    useUnifiedTopology :true
}, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('success to connect to database');
});

app.listen(PORT, () => {
    console.log(`Server of abscence started on http://localhost:${PORT}`);
});