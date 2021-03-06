const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3006;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/evaluation', {
    useNewUrlParser : true,
    useUnifiedTopology : true
},(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success to connect to database');
    }
});

const Evaluation = require('./routes/evaluation.routes');
app.use('/ecms/evaluation', Evaluation);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});