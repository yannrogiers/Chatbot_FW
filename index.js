const express = require('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json());

require('./Routes/dialogFlowRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);

