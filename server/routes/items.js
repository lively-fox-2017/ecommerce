const express = require('express');
const router = express.Router();
const items = require('../controllers/items');

router.get('/', items.findAll)
router.post('/', items.create)
router.put('/:id', items.update)
router.delete('/:id', items.delete)

module.exports = router;
