'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// read all transactions
router.get('/transactions', controllers.Transaction.findAll);

// read all users
router.get('/getusers', controllers.User.findAll);

// create user
router.post('/createuser', controller.User.create);

// delete one user by id
router.delete('/deleteuser/:id', controllers.User.delete);

module.exports = router;