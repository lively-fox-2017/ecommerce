const express = require('express');
const router = express.Router();
const Item = require('../controllers/items')
// const db = "mongodb://127.0.0.1:27017/mongoose-library"


router.post('/', Item.create)

router.get('/', Item.findAll)

router.put('/:id', Item.update)

router.delete('/:id', Item.delete)

module.exports = router;