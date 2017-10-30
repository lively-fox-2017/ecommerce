const express=require('express')
const app= express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce')
var bodyParser = require('body-parser')
var cors = require('cors')
var logger = require('morgan')

app.use(cors())
app.use(logger())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'html');

const index = require('./routes/index')
const item = require('./routes/item')

app.use('/',index)
app.use('/item',item)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
