const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const aut = require('../helper/aut')

router.get('/', productController.all)
router.post('/', aut.login, aut.logAdmin, productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.remove)

module.exports = router
