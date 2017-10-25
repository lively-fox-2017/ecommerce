const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const transactionRoute = require('./routes/transactionRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/transaction', transactionRoute);

// set the view engine to ejs
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000');
});
