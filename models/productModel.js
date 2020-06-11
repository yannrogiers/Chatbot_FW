const mongoose = require('mongoose');
const Schema = mongoose.Schema

//schema voor database
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0,
        required: true
    },
    countInStock:{
        type: Number,
        default: 0,
        required: true
    },
    description:{
        type: String,
        required: true

    }
    
    
})

module.exports = productModel = mongoose.model('Product', productSchema)