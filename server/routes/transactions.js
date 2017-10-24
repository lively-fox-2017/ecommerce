const express = require('express')
const router = express.Router()
const transaction = require('../controller/transactionController')

router.get('/', transaction.findAll);

router.get('/:id', transaction.findOne);

router.post('/insert', transaction.insert);

router.put('/update/:id', transaction.update);

router.delete('/delete/:id', transaction.delete);

module.exports = router
