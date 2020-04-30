const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5555

// config our body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// config cors
app.use(cors());

// connect to database 
mongoose.connect('mongodb://localhost:27017/product', {
    useNewUrlParser : true,
    useUnifiedTopology : true
},(err) => {
    if(err) {
        console.log(err);
    }else{
        console.log('connected to database...');
    }
})

//load our product
const productRouter = require('./routes/product.routes');

app.use('/ecms/product', productRouter);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});



