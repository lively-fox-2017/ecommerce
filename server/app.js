'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const decodeToken = require('./helpers/decode-token');
const error404 = require('./helpers/error-404');

const admin = require('./routes/admin');
const item = require('./routes/item');
const user = require('./routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// after this middleware runs,
// access user information in req.headers.user
app.use(decodeToken);

app.use('/admin', admin);
app.use('/item', item);
app.use('/user', user);

// 404 handler
app.use('/', error404);

app.listen(3000, console.log('ecommerce server listening on port 3000'));