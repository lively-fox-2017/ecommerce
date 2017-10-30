const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res,nex)=>{
  res.json(
    {name:'server',port:3000}
  )
})
const signin = require('./routes/signin');
const transaction = require('./routes/transaction');
const item = require('./routes/item');
const signup = require('./routes/signup');

app.use('/api/signin',signin);
app.use('/api/transactions',transaction);
app.use('/api/items',item);
app.use('/api/signup',signup)

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Listening from port 3000');
})
