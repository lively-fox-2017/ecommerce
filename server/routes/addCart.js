const express = require('express')
const router = express.Router()
const addCartController = require('../controller/addCart')

router.get('/', addCartController.all)
router.post('/', addCartController.create)
router.delete('/:id', addCartController.remove)

module.exports = router
