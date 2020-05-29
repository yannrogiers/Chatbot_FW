const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const config = require('./config/keys');
const Users = require('./Routes/Users')

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


require('./models/Registration');
require('./models/Demand');
require('./models/Items')
require('./models/userModel')



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

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
app.use('/Users', Users)


const PORT = process.env.PORT || 5000;
app.listen(PORT);

