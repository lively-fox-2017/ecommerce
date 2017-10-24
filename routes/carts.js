const express = require('express');
const router = express.Router();
const Cart = require('../controllers/carts')

router.post('/', Cart.create)

router.get('/', Cart.findAll)

router.put('/:id', Cart.update)

router.delete('/:id', Cart.delete)

module.exports = router;