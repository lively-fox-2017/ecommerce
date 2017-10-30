var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = 'mongodb://jason:123@lively-ecommerce-shard-00-00-jmypf.mongodb.net:27017,lively-ecommerce-shard-00-01-jmypf.mongodb.net:27017,lively-ecommerce-shard-00-02-jmypf.mongodb.net:27017/test?ssl=true&replicaSet=lively-ecommerce-shard-0&authSource=admin'

mongoose.connect(db);

var index = require('./routes/index');
var users = require('./routes/users');
var product = require('./routes/product');
var customer = require('./routes/customer');
var collection = require('./routes/transaction')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/products', product);
app.use('/customers', customer);
app.use('/transactions',  collection);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
