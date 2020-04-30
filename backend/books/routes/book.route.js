const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
// const multer = require('multer');

require('../models/Book');
const Book = mongoose.model('Book');


const fileUpload = require('express-fileupload');



// var storage = multer.diskStorage({
//     destination : function(req, file, cb){
//         cb(null, 'uploadsBooks')
//     },
//     filename : function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({storage : storage});

const bookcontroller = require('../controllers/book.controller');
// our router 
// router.post('/addBook',bookcontroller.addBook);
router.get('/all', bookcontroller.getAllBooks);
router.get('/:id', bookcontroller.getBookById);
router.get('/find/:title', bookcontroller.getBookByTitle);
router.delete('/delete/all', bookcontroller.deleteAllBooks);
router.delete('/delete/:id', bookcontroller.deleteBook);
router.put('/update/:id', bookcontroller.updateBook );

router.use(fileUpload({
    createParentPath : true
}));

router.post('/upload-book', async (req, res) => {

    console.log(req.files.image.name);
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "image") to retrieve the uploaded file
            let image = req.files.image;


              //Use the mv() method to place the file in upload directory (i.e. "uploads")
              image.mv('./uploads/' + image.name);

            var book = new Book({
                title : req.body.title,
                title : req.body.title,
                auther : req.body.auther,
                numberPages : req.body.numberPages,
                publisher : req.body.publisher,
                description : req.body.description,
                image : image.name
            });

            book.save((err,book) => {
                if(err) {
                    res.send(err);
                }
                if(book) {
                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            book
                        }
                            
                            // name: image.name,
                            // mimetype: image.mimetype,
                            // size: image.size
                       
                    });
                }
            })  
        }

    } catch (err) {
        res.status(500).send(err);
    }
});


router.use(express.static(path.join(__dirname, "uploads")));

// router.get('/download', (req, res) => {
//     res.download(path.join(__dirname, "/uploads/docker.png")).send('ok');
    
// });






module.exports = router;
