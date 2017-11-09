const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
var cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

let user = require('./routers/user.js')
let product = require('./routers/product.js')
let transaction = require('./routers/transaction.js')

app.use('/user',user)
app.use('/product',product)
app.use('/transaction',transaction)

app.listen(3000,()=>{
  console.log('Running');
})
