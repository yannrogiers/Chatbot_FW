const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./Routes/userRoute')
const productRoute = require('./Routes/productRoute')
const orderRoute = require('./Routes/orderRoute')

//Config voor mongoose & heroku
const config = require('./config/keys');
const mongoose = require('mongoose');


//Middlewares
app.use(express.json());
app.use(bodyParser.json());

//Mongoose connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//Api calls
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/products', productRoute)
app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID)
})

if (process.env.NODE_ENV === 'production') {
    //JS & CSS files
    app.use(express.static('client/build'));

    //Index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}





//Models
require('./models/Registration');
require('./models/Demand');
require('./models/sortOfSystemModel')
require('./models/userModel')


//Routes for chatbot
require('./Routes/dialogFlowRoutes')(app);
require('./Routes/fulFillmentRoutes')(app);





const PORT = process.env.PORT || 5000;
app.listen(PORT);

