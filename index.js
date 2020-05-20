const express = require('express');
const bodyParser = require ('body-parser');

const app = express();

const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {useNewUrlParser: true});

require('./models/Registration');
require('./models/Demand');
require('./models/sort_systems')

app.use(bodyParser.json());

require('./Routes/dialogFlowRoutes')(app);
require('./Routes/fulFillmentRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //JS & CSS files
    app.use(express.static('client/build'));

    //Index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

