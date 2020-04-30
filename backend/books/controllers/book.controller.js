const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
//load the model
require('../models/Book');
const Book = mongoose.model('Book');


// var storage = multer.diskStorage({
//     destination : function(req, file, cb){
//         cb(null, 'uploadsBooks')
//     },
//     filename : function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({storage : storage});

var upload = multer({ dest: 'uploads/' })




/** ------------------------ create a book ------------------------*/

// insertBook = (upload.single('book'), function(req, res) {
//     var 
// })

addBook = (req,res) => {
    var newBook = {
        title : req.body.title,
        auther : req.body.auther,
        numberPages : req.body.numberPages,
        publisher : req.body.publisher,
        description : req.body.description,
    }

    var book = new Book(newBook);
    book.save().then((book) => {
        res.json({
            message : 'book added with success',
            data :book
        })
    }).catch((err) => {
        console.log(err);
    })
};
/**----------- delete book by id ----------------- */
deleteBook = (req,res) => {
    Book.findByIdAndDelete(req.body.id).then(() => {
        res.json('book deleted with success');
    }).catch((err) => {
        console.log(err);
    })
};

/** ----------------- delete all books ------------- */
deleteAllBooks = (req,res) => {
    Book.deleteMany({}).then(() => {
        res.send('all books deleted !');
    }).catch((err) => {
        console.log(err);
    })
};

/** -------------- get all books ------------------- */
getAllBooks = (req,res) => {
    Book.find({}).then((books) => {
        res.json({
            books : books
        })
    }).catch((err) => {
        console.log(err);
    })
}

/**----------- get book by id -------------------- */
getBookById = (req,res) => {
    Book.findById(req.body.id || req.params.id).then((book) => {
        res.json(book);
    }).catch((err) => {
        console.log(err);
    })
};

/** ------------ get book by title --------------- */

getBookByTitle = (req, res) => {
    Book.find({title : req.body.title || req.params.title}, (err, books) => {
        if (err) {
            res.json(err);
        }else {
            res.json(books);
        }
    })
}

/** ------------ update book -------------------- */

updateBook = (req,res) => {
   Book.findOneAndUpdate({_id : req.params.id}, req.body , {new : true , useFindAndModify : false}, (err, doc) => {
       if (err) {
           console.log(err);
       } else {
           res.json({
               message : 'book updated with success !',
               data : doc
           })
       }
   })
};

addPhoto = (req,res) => {

}

const bookcontroller = {
    addBook,
    deleteBook,
    deleteAllBooks,
    getAllBooks,
    getBookById,
    getBookByTitle,
    updateBook
};

module.exports = bookcontroller;






