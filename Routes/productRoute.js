const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const {isAdmin, isAuth} = require('../util');



router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found." });
    }
  });

router.put('/:id', isAuth, isAdmin ,async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId })
    if (product) {

        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product updated', data: updatedProduct })
        }
    }
    return res.status(500).send({ message: 'Error while updating product' })


});

router.post('/', isAuth, isAdmin,  async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        countInStock: req.body.countInStock,
        description: req.body.description
    });

    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New product added', data: newProduct })
    } else {
        return res.status(500).send({ message: 'Error while adding product' })
    }
});



router.delete('/:id', isAuth, isAdmin,  async(req, res)=>{
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product has been deleted successfully"})
    }else{
    res.send("Error while trying to delete product")
    }
});

module.exports = router;