const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const customer = require('./routes/customer')
const product = require('./routes/product')
const transaction = require('./routes/transaction')
const auth = require('./routes/auth')
require('dotenv').config()
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use('/api/customer', customer)
app.use('/api/product', product)
app.use('/api/transaction', transaction)
app.use('/api/auth', auth)

app.listen(3000)
