'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const isUser = require('./helpers/is-user');
const isAdmin = require('./helpers/is-admin');
const error404 = require('./helpers/error-404');

const admin = require('./routes/admin');
const index = require('./routes/index');
const user = require('./routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/user', isUser, user);
app.use('/admin', isUser, isAdmin, admin);

// 404 handler
app.use('/', error404);

app.listen(process.env.PORT || 3000, console.log('ecommerce server listening on port 3000'));