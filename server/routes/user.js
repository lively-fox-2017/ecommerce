'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// save user transaction -- create new transaction record
router.post('/checkout', controllers.Transaction.create);

module.exports = router;