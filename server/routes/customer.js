const express = require('express')
const router = express.Router()
const customerController = require('../controller/customer')

router.get('/', customerController.all)
router.post('/', customerController.create)
router.delete('/:id', customerController.remove)

module.exports = router
