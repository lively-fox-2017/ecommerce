'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// get all item
router.get('/', controllers.Item.findAll);

// verify user, send token if verified
router.post('/signin', controllers.User.signin);

// register new user
router.post('/signup', controllers.User.signup);


module.exports = router;