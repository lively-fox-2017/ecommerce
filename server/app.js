const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb://Indraprahastha:Pancasila-85@cluster0-shard-00-00-ubshk.mongodb.net:27017,cluster0-shard-00-01-ubshk.mongodb.net:27017,cluster0-shard-00-02-ubshk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(uri, err => {
  if(err) {
    console.log('error-nya',err);
  }
  else {
  }
});
var db = mongoose.connection;

let user = require('./routers/user.js')
let product = require('./routers/product.js')
let transaction = require('./routers/transaction.js')

app.use('/user',user)
app.use('/product',product)
app.use('/transaction',transaction)

app.listen(process.env.PORT || 3005,()=>{
  console.log('Running');
})
