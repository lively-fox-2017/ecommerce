const express = require('express')
const router = express.Router()
const product = require('../controller/productController')

router.get('/', product.findAll);

router.get('/:id', product.findOne);

router.post('/insert', product.insert);

router.put('/update/:id', product.update);

router.delete('/delete/:id', product.delete);

module.exports = router
