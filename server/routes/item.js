'use strict'

const express = require('express');
const controllers = require('./../controllers');

const router = express.Router();

// get all item
router.get('/', controllers.Item.findAll);

// get one item by id
router.get('/:id', controllers.Item.findOne);

// create one item
router.post('/', controllers.Item.create);

// update one item by id
router.put('/:id', controllers.Item.update);

// delete one item by id
router.delete('/:id', controllers.Item.delete);

module.exports = router;