const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3005;

const courRoute = require('./routes/courRoute');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cour', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
       console.log('success to connect to database!'); 
    }
})

app.use('/ecms/cour/',courRoute);


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});