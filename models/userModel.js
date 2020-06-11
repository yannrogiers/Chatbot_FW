const mongoose = require('mongoose');
const Schema = mongoose.Schema


//schema voor database bij login/register
const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = userModel = mongoose.model('User', userSchema)