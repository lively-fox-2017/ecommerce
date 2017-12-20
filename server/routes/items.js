const express = require('express');
const router = express.Router();
const items = require('../controllers/itemsCtrl');

router.get('/', items.getItems)
router.post('/add', items.addItem)
router.put('/:id', items.updateItem)
router.delete('/:id', items.deleteItem)

module.exports = router;
