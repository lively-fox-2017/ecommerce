'use strict'

const User = require('./user');
const Item = require('./item');
const Transaction = require('./transaction');

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds229415.mlab.com:29415/ecommerce`);
mongoose.Promise = global.Promise;

module.exports = { User, Item, Transaction }