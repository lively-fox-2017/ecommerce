'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// read all transactions
router.get('/transactions', controllers.Transaction.findAll);

// read all users
router.get('/getusers', controllers.User.findAll);

// create user
router.post('/createuser', controllers.User.create);

// delete one user by id
router.delete('/deleteuser/:id', controllers.User.delete);

// get one item by id
router.get('/item/:id', controllers.Item.findOne);

// create one item
router.post('/item', controllers.Item.create);

// update one item by id
router.put('/item/:id', controllers.Item.update);

// delete one item by id
router.delete('/item/:id', controllers.Item.delete);

module.exports = router;