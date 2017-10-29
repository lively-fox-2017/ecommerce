const express = require('express');
const router = express.Router();
const Carts = require('../controllers/carts')


/* GET home page. */
router.get('/', Carts.findCarts)
router.post('/', Carts.createCarts)
router.delete('/:id', Carts.deleteCarts)
router.put('/:id', Carts.updateCarts)
router.get('/:id', Carts.findCartsById)
module.exports = router;
