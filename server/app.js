'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const admin = require('./routes/admin');
const item = require('./routes/item');
const user = require('./routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', admin);
app.use('/item', item);
app.use('/user', user);


app.listen(3000, console.log('ecommerce server listening on port 3000'));