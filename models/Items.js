const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
    system: String,
    link: String,
});

mongoose.model('item', itemSchema)