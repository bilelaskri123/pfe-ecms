const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Product');
const Product = mongoose.model('Product');

const productcontroller = require('../controllers/product.controller');


router.get('/all', productcontroller.getAllProducts); // get all products 
router.get('/:id', productcontroller.getProductById); // get product by id 
router.get('/:category', productcontroller.getProductByCategory); // get products by category 
router.delete('/delete/all', productcontroller.deleteAllProduct); // delete all products 
router.delete('/delete/:id', productcontroller.deleteById); // delete product by id 
router.put('/update/:id', productcontroller.updateProduct);


const multer = require('multer');
const PHOTO_PATH = 'Images';

// var upload = multer({ dest : `${PHOTO_PATH}/`});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${PHOTO_PATH}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    limits: {
        fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' || file.mimetype !== 'image/gif' || file.mimetype !== 'image/jpeg') {
            return cb(null, false);
        } else {
            cb(null, true);
        }
    }
});

var upload = multer({ storage: storage });

router.post('/newProduct', upload.single('image'), async (req, res) => {
    try {
        const photo = req.file;
        // console.log(photo);
        if (!photo) {
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            });
        } else {


            // console.log(photo.mimetype);
            var isImage = photo.mimetype == 'image/png' || photo.mimetype == 'image/jpeg';
            // console.log(isImage);

            if (isImage) {
                var newProduct = new Product({
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    description: req.body.description,
                    image: photo.originalname,

                });

                newProduct.save({}, (err, product) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.json({
                        message: 'product created with success !',
                        data: product
                    })
                });
            } else {
                res.send('require an image !')
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


router.put('/update/:id',upload.single('image'), (req, res) => {
    try {
        const photo = req.file;
        if (!photo) {
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            });
        } else {

            var isImage = photo.mimetype == 'image/png' || photo.mimetype == 'image/jpeg';
            console.log(isImage);

            Product.updateOne({_id : req.params.id}, req.body , (err, newProduct) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // doit complété 
                }
            })

        }
    }catch(err) {
        res.status(500).send(err);
    }

});


module.exports = router;



// router.post('/', productcontroller.addProduct);