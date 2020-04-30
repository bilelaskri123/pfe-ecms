const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const app = express();

/**
 * ? cors est utiliser pour la communication entre le backend et le frontend
 */
var corsOptions = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type application/json
app.use(bodyParser.json());

//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const db = require("./models");
const dbConfig = require('./config/db.config');
const Role = db.role;


// connect to database 
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        // initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    }
    );

// app.use('', (req,res) => {
//     res.send('hello users')
// });

const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');
app.use('/ecms/auth', auth);
app.use('/ecms/user', user);

// set port listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// initial() nous aide à créer 3 lignes importantes dans la rolescollection.
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "student"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'student' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });

            new Role({
                name: "trainer"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });

            new Role({
                name: "rh"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'rh' to roles collection");
            });

            new Role({
                name: "parent"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'parent' to roles collection");
            });


            new Role({
                name: "provider"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'provider' to roles collection");
            });

            new Role({
                name: "financial"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'financial' to roles collection");
            });

            new Role({
                name: "biblio"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'biblio' to roles collection");
            });
        }
    });
}

initial();