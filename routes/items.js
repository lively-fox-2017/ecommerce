const express = require('express');
const router = express.Router();
const Items = require('../controllers/items')


/* GET home page. */
router.get('/', Items.findItems)
router.post('/', Items.createItems)
router.delete('/:id', Items.deleteItems)
router.put('/:id', Items.updateItems)
router.get('/:id', Items.findItemsById)
module.exports = router;
