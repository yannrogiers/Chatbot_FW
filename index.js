const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute')
const productRoute = require('./Routes/productRoute')
const orderRoute = require('./Routes/orderRoute')


if (process.env.NODE_ENV === 'production') {
    //JS & CSS files
    app.use(express.static('client/build'));

    //Index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
       // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.use(express.json());
app.use(bodyParser.json());

const config = require('./config/keys');

app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID)
})
app.use('/api/products', productRoute)



mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


require('./models/Registration');
require('./models/Demand');
require('./models/Items')
require('./models/userModel')

app.use(bodyParser.json());


require('./Routes/dialogFlowRoutes')(app);
require('./Routes/fulFillmentRoutes')(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT);

