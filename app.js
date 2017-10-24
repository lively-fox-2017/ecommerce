var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/library')

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books')
var transactions = require('./routes/transactions')
var customers = require('./routes/customers')
var items = require('./routes/items')
var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/books', books)
app.use('/transactions', transactions)
app.use('/customers', customers)
app.use('/items', items)

module.exports = app;
