const express = require('express');
const router = express.Router();
const Transaksi = require('../controllers/transactions')


/* GET home page. */
router.get('/', Transaksi.findTransaction)
router.post('/', Transaksi.createTransaction)
router.delete('/:id', Transaksi.deleteTransaction)
router.put('/:id', Transaksi.updateTransaction)

module.exports = router;
