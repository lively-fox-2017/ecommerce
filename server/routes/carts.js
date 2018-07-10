const express = require('express');
const router = express.Router();
const carts = require('../controllers/cartsCtrl');

router.get('/', carts.validate, carts.getCarts)
router.post('/', carts.validate, carts.addCart)

module.exports = router;
