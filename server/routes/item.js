'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// get all item
router.get('/', controllers.Item.findAll);


module.exports = router;