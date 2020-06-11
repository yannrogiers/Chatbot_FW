const mongoose = require('mongoose')
const { Schema } = mongoose

//Schema voor database, via chatbot
const registrationSchema = new Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    registerDate: Date
});

mongoose.model('registration', registrationSchema)