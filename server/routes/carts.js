const express = require('express');
const router = express.Router();
const carts = require('../controllers/carts');

router.get('/', carts.findAll)
router.post('/', carts.create)
router.put('/:id', carts.update)
router.delete('/:id', carts.delete)

module.exports = router;
