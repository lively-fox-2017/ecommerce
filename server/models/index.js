'use strict'

const User = require('./user');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce');
mongoose.Promise = global.Promise;

module.exports = User;