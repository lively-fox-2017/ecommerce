var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
 
var app = express();
var index = require('./routes/index');
var products = require('./routes/products');
var category = require('./routes/category');
var users = require('./routes/users');
var transactions = require('./routes/transactions');
let login = require('./routes/login')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cors())

app.use('/login', login)
app.use('/', index);
app.use('/products', products);
app.use('/category', category);
app.use('/users', users);
app.use('/transactions', transactions);
module.exports = app;
