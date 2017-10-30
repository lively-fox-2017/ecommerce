const express = require('express')
const router = express.Router()
const items=require('../controllers/item')

router.post('/',items.insertItem)

router.get('/',items.viewItem)

router.delete('/:id',items.deleteItem)

router.put('/:id',items.updateItem)

module.exports = router;
