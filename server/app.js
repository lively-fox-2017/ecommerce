var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin')
var product = require('./routes/product')
var addCart = require('./routes/addCart')
var customer = require('./routes/customer')

var app = express();
app.use(cors())

mongoose.connect(`mongodb://jainal:pakuhaji@cluster0-shard-00-00-9k2a6.mongodb.net:27017,cluster0-shard-00-01-9k2a6.mongodb.net:27017,cluster0-shard-00-02-9k2a6.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, (err) => {
  if(err){
    console.log('database belum connect')
  } else {
    console.log('database sudah konek')
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin)
app.use('/product', product)
app.use('/addcart', addCart)
app.use('/customer', customer)


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
