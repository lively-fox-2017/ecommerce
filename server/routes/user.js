'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// verify user, send token if verified
router.get('/signin', controllers.User.signin);

// register new user
router.post('/signup', controllers.User.signup);

// save user transaction -- create new transaction record
router.post('/checkout', controllers.Transaction.create);

module.exports = router;