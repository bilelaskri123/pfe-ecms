const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3002

const app = express();

// config body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// enabling cors 
app.use(cors());

// connect to databse 

mongoose.connect('mongodb://localhost:27017/books', {
    useNewUrlParser : true,
    useUnifiedTopology :true
}, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('success to connect to database');
});


app.use(express.static('uploads'));
// load our router 
const bookRouter = require('./routes/book.routes');

// use the router 
app.use('/ecms/library/book',bookRouter);



app.listen(PORT, () => {
    console.log(`Server of books started on http://localhost:${PORT}`);
});