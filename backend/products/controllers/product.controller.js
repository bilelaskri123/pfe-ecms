const express = require('express');
const mongoose = require('mongoose');

require('../models/Product');
const Product = mongoose.model('Product');

/** ------------------ create our fonctionnality ---------------- */

addProduct = (req,res) => {
    var newProduct = {
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        description : req.body.description,
        image : req.body.image
    };

    var product = new Product(newProduct);
    product.save((err,product) => {
        if(err) {
            res.json(err);
        }else{
            res.json({
                message : 'product added with success!',
                data :product
            })
        }
    })
};

getProductById = (req,res) => {
    Product.findById(req.body.id || req.params.id, (err, product) => {
        if (err) {
            console.log(err);   
        } else {
           res.json(product); 
        }
    })
};

getProductByCategory = (req,res) => {
    Product.find({category : req.body.category || req.params.category}, (err, products) => {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
}

getAllProducts = (req,res) => {
    Product.find({},(err,products) => {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
}

deleteAllProduct = (req,res) => {
    Product.deleteMany({}).then(() => {
        res.json('all producted deleted with success');
    }).catch((err) => {
        console.log(err);
    })
};

deleteById = (req,res) => {
    Product.findByIdAndDelete(req.body.id || req.params.id, (err,product) => {
        if(err) {
            console.log(err);
        }else{
            res.json({
                message : `product ${product.name} deleted`
            })
        }
    })
};

updateProduct = (req,res) => {
    Product.updateOne({_id : req.params.id}, req.body, {useFindAndModify : false}, (err, newProduct) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message : 'Product updated with success !',
                data : newProduct
            })
        }
    })
};


const productcontroller = {
    addProduct,
    getProductById,
    getProductByCategory,
    getAllProducts,
    deleteAllProduct,
    deleteById,
    updateProduct
}

module.exports = productcontroller;

