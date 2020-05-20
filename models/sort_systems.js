const mongoose = require('mongoose')
const { Schema } = mongoose

const sort_systemSchema = new Schema({
    system: String,
    type: String,
});

mongoose.model('sort', sort_systemSchema)